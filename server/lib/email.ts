import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (to: string, rawToken: string) => {
  const link = `${process.env.APP_URL}/auth/verify-email?token=${rawToken}`;
  return resend.emails.send({
    from: "Personal Finance App <onboarding@resend.dev>",
    to,
    subject: "Verify your email",
    html: `Click <a href="${link}">here</a> to verify your email.`,
  });
};