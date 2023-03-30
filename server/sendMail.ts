import nodemailer from "nodemailer";

export type mailMeta = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export default async function sendMail(meta: mailMeta): Promise<string> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpUserName = process.env.SMTP_USERNAME;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const info = await transporter.sendMail({
    from: `"${smtpUserName}" <${smtpUser}>`,
    to: meta.to,
    subject: meta.subject,
    text: meta.text,
    html: meta.html,
  });

  return info.messageId;
}
