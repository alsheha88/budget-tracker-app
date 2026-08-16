import type { RequestHandler } from "express";
import {
	createUserSchema,
	loginSchema,
	verifyEmailSchema,
} from "../../schemas/user/user.js";
import {
	ConflictError,
	ForbiddenError,
	NotFoundError,
	UnauthorizedError,
	ValidationError,
} from "../../errors/errors.js";
import {
	checkPassword,
	generateRawToken,
	generateToken,
	hashPassword,
	hashToken,
} from "../../lib/authUtils.js";
import {
	createEmailVerification,
	createRefreshToken,
	createUser,
	dbGetRefreshToken,
	getEmailVerificationToken,
	getUserByEmail,
	invalidateAllUserRefreshTokens,
	markRefreshToken,
	updateEmailVerificationToken,
	verifyUser,
} from "../../db/functions/user/user.js";
import { sendVerificationEmail } from "../../lib/email.js";
import { prisma } from "../../lib/prisma.js";

export const signUp: RequestHandler = async (req, res) => {
	const validateRequest = createUserSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate inputs",
			validateRequest.error.issues,
		);
	const email = validateRequest.data.email.toLocaleLowerCase();
	const existingUser = await getUserByEmail(email);
	if (existingUser)
		throw new ConflictError("A user with this email already exists");

	const passwordHash = await hashPassword(validateRequest.data.passwordHash);
	const newUser = {
		fullName: validateRequest.data.fullName,
		phoneNumber: validateRequest.data.phoneNumber,
		email,
		passwordHash,
	};
	const rawToken = generateRawToken();
	const tokenHash = hashToken(rawToken);
	const createdUser = await prisma.$transaction(async (tx) => {
		const user = await createUser(newUser, tx);
		await createEmailVerification(tokenHash, user.id, tx);
		return user;
	});

	await sendVerificationEmail(email, rawToken);

	res.status(201).json({
		data: {
			id: createdUser.id,
			fullName: createdUser.fullName,
			email: createdUser.email,
		},
	});
};

export const login: RequestHandler = async (req, res) => {
	const validateRequest = loginSchema.safeParse(req.body);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate inputs",
			validateRequest.error.issues,
		);

	const email = validateRequest.data.email.toLocaleLowerCase();
	const password = validateRequest.data.passwordHash;

	const foundUser = await getUserByEmail(email);
	if (!foundUser) throw new NotFoundError("User not found");

	const isPasswordCorrect = await checkPassword(
		password,
		foundUser.passwordHash,
	);
	if (!isPasswordCorrect)
		throw new UnauthorizedError("email or password is not correct");
	if (!foundUser.isVerified)
		throw new ForbiddenError("Please verify your email before logging in");

	const rawToken = generateRawToken();
	const tokenHash = hashToken(rawToken);
	const accessToken = generateToken({ userId: foundUser.id });

	await createRefreshToken(tokenHash, foundUser.id);

	res.cookie("refreshToken", rawToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		maxAge: 1000 * 60 * 60 * 24 * 30,
	});

	res.status(200).json({ data: { token: accessToken } });
};

export const logout: RequestHandler = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	if (refreshToken) {
		const tokenHash = hashToken(refreshToken);
		await markRefreshToken(tokenHash);
	}
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
	});

	res.status(200).json({ message: "Logged out successfully" });
};

export const verifyEmail: RequestHandler = async (req, res) => {
	const validateRequest = verifyEmailSchema.safeParse(req.query);
	if (!validateRequest.success)
		throw new ValidationError(
			"Failed to validate token",
			validateRequest.error.issues,
		);
	const token = hashToken(validateRequest.data.token);
	const existingToken = await getEmailVerificationToken(token);
	if (
		!existingToken ||
		existingToken.expiresAt < new Date() ||
		existingToken.usedAt
	)
		throw new ConflictError("Used or expired link");

	const updateVerification = await updateEmailVerificationToken(token);

	await verifyUser(updateVerification.userId);

	res.status(200).json("Email verified successfully");
};

export const refresh: RequestHandler = async (req, res) => {
	const cookie = req.cookies.refreshToken;
	if (!cookie) throw new UnauthorizedError("No token provided");

	const hashedCookie = hashToken(cookie);
	const existingToken = await dbGetRefreshToken(hashedCookie);
	if (!existingToken) throw new UnauthorizedError("Invalid token");
	const userId = existingToken.userId;
	if (existingToken.usedAt) {
		await invalidateAllUserRefreshTokens(userId);
		throw new UnauthorizedError("Token reuse detected. Please log in again.");
	}
	if (existingToken.expiresAt < new Date())
		throw new UnauthorizedError("token is expired");

	const rawToken = generateRawToken();
	const newHash = hashToken(rawToken);
	await prisma.$transaction(async (tx) => {
		await markRefreshToken(existingToken.tokenHash, tx);
		await createRefreshToken(newHash, userId, tx);
	});
	const accessToken = generateToken({ userId });

	res.cookie("refreshToken", rawToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		maxAge: 1000 * 60 * 60 * 24 * 30,
	});

	res.status(200).json({ data: { accessToken } });
};

export const resetPassword: RequestHandler = async (req, res) => {};
