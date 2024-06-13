const nodemailer = require("nodemailer");
class MailService {
  constructor() {
    this.trasporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendMail(email, activationLink) {
    await this.trasporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Activation accaunt link ${activationLink}`,
      html: `
        <div>
        <a href ="${activationLink}">Click to activate account</a>
        </div>
        `,
    });
  }
}
module.exports = new MailService();
