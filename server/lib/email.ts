//test
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	family: 4,
	auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASS },
} as nodemailer.TransportOptions);

export const sendVerificationEmail = async (to: string, rawToken: string) => {
	const link = `${process.env.APP_URL}/auth/verify-email?token=${rawToken}`;
	return transporter.sendMail({
		from: `Personal Finance App <${process.env.SMTP_EMAIL}>`,
		to,
		subject: "Verify your email",
		html: `Click <a href="${link}">here</a> to verify your email.`,
	});
};
