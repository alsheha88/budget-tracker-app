import { prisma } from "../../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { CreateUser, UpdateUser } from "../../../schemas/user/user.js";

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
};
export const getUserById = async (id: string) => {
	return await prisma.user.findUnique({
		where: {
			id,
		},
		omit: {
			passwordHash: true,
		}
	});
};

export const createUser = async (
	user: CreateUser,
	client: Prisma.TransactionClient = prisma,
) => {
	const email = user.email.toLowerCase();
	return await client.user.create({ data: { ...user, email } });
};

export const createEmailVerification = async (
	tokenHash: string,
	userId: string,
	client: Prisma.TransactionClient = prisma,
) => {
	return await client.emailVerification.create({
		data: {
			verificationCode: tokenHash,
			userId,
			expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
		},
	});
};
export const verifyUser = async (id: string) => {
	return await prisma.user.update({
		where: { id },
		data: { isVerified: true },
	});
};

export const getEmailVerificationToken = async (token: string) => {
	return await prisma.emailVerification.findFirst({
		where: { verificationCode: token },
	});
};
export const updateEmailVerificationToken = async (token: string) => {
	return await prisma.emailVerification.update({
		where: { verificationCode: token },
		data: { usedAt: new Date() },
	});
};

export const deleteUser = async (id: string) => {
    return await prisma.user.deleteMany({
        where: { id },
	});
};

export const editUser = async (user: UpdateUser, id: string) => {
    const data = Object.fromEntries(
        Object.entries(user).filter(([, v]) => v !== undefined),
	);
	return await prisma.user.update({ where: { id }, data });
};

export const createRefreshToken = async (token: string, userId: string, client: Prisma.TransactionClient = prisma) => {
    return await client.refreshToken.create({
        data: {
            tokenHash: token,
            userId: userId,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
    });
};
export const markRefreshToken = async (tokenHash: string, client: Prisma.TransactionClient = prisma) => {
	return await client.refreshToken.updateMany({
		where: { tokenHash, usedAt: null },
		data: { usedAt: new Date() },
	});
};
export const dbGetRefreshToken = async (tokenHash: string) => {
	return await prisma.refreshToken.findFirst({ where: { tokenHash } });
};

export const invalidateAllUserRefreshTokens = async (userId: string) => {
  return await prisma.refreshToken.updateMany({
    where: { userId, usedAt: null },
    data: { usedAt: new Date() },
  });
};