/* jshint esversion:8 */
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  service: "qq", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: "260338538@qq.com",
    // 这里密码不是qq密码，是你设置的smtp授权码
    pass: "erpnxaaqtdpxbhfj"
  }
});

/**
 *
 *
 * @param {*} mail 接受邮箱
 * @param {*} title 标题
 * @param {*} subject 主题
 * @param {*} body  校验码
 * @returns
 */
module.exports = (mail, title, subject, body) => {
  body = String(body);
  title = title || "Ladis";
  if (title == "注册") body = `注册验证码：<strong>${body}</strong>`;
  if (title == "重置密码") body = `重置验证码：<strong>${body}</strong>`;
  subject = subject ? subject + title : "test";
  mailOptions = {
    from: `"${title}" <260338538@qq.com>`, // sender address
    to: mail, // list of receivers
    subject, // Subject line
    html: body // 发送text或者html格式 // text: 'Hello world?', // plain text body
  };

  return new Promise((res, rej) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) rej(error);
      res(info);
    });
  });
};
