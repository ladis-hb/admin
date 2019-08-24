/* jshint esversion:8 */
const config = require("../../config");
const {
  formartBody,
  formatPasswd,
  formatMD5,
  formatDate,
  formatlog,
  Validation_user
} = require("../../util/Format");
const MailSend = require("../../util/MailSend");

const login = async ctx => {
  let { user: us, passwd: pw } = ctx.query;
  let u = await await ctx.db
    .collection(config.DB_user_users)
    .findOne(
      { $or: [{ user: us }, { mail: us }] },
      { user: 1, mail: 1, _id: 0, userId: 1 }
    );
  if (u) {
    let { user, passwd, mail, userId, userGroup } = u;
    if ((user == us || mail == us) && passwd == formatMD5(formatPasswd(pw))) {
      //添加token
      let token = formatMD5(Date.now());
      await ctx.db
        .collection(config.DB_user_users)
        .updateOne(
          { user, mail },
          { $set: { token, address: ctx.ip.split(":").reverse()[0] } }
        );
      let body = new Promise(res => {
        setTimeout(() => {
          let body = formartBody("success", "用户登录成功", {
            user,
            route: userGroup == "root" ? "/root" : "/main",
            token,
            userId: userId || "undefault"
          });
          res(body);
        }, 1000);
      });
      ctx.body = await body;
      ctx.log = { type: config.DB_log_run, msg: `用户登录成功`, user };
    } else {
      ctx.body = formartBody("error", "用户名或密码错误", "");
      ctx.log = {
        type: config.DB_log_run,
        msg: `用户登录失败,用户名或密码错误`,
        user
      };
    }
  } else {
    ctx.body = formartBody("error", "用户名错误", "");
    ctx.log = {
      type: config.DB_log_run,
      msg: `用户登录失败-没有检索到用户名`,
      user
    };
  }
};

const register = async ctx => {
  let { name, user, passwd, passwdck, mail, orgin, tel } = ctx.query;
  if (typeof user != "string" || user.length > 20)
    ctx.body = formartBody("error", "账号格式错误");
  if (typeof passwd != "string" || passwd.length > 50)
    ctx.body = formartBody("error", "密码格式错误");
  if (passwd != passwdck) ctx.body = formartBody("error", "密码不一致");
  for (let val of [mail, orgin, tel]) {
    if (typeof val != "string" || val.length > 40)
      ctx.body = formartBody("error", "格式错误", val);
  }

  if (!ctx.body) {
    let u = await ctx.db
      .collection(config.DB_user_users)
      .findOne({ $or: [{ user }, { mail }] });
    if (u) {
      ctx.body = formartBody(
        "warn",
        "账号或邮箱已被注册，请使用未被注册的用户",
        ""
      );
      ctx.log = {
        type: config.DB_log_run,
        msg: `用户注册失败-用户名或邮箱已被注册`,
        user
      };
    } else {
      let users = {
        userId: formatMD5(Date.now() + passwd),
        name: name == "" ? user : name,
        user,
        userGroup: "user",
        passwd: formatMD5(formatPasswd(passwd)),
        mail,
        orgin,
        tel,
        creatTime: formatDate(),
        modifyTime: formatDate(),
        address: ctx.ip.split(":").reverse()[0]
      };
      let result = await ctx.db
        .collection(config.DB_user_users)
        .insertOne(users);
      ctx.body = formartBody("success", "register success", result.result);
      ctx.log = {
        type: config.DB_log_run,
        msg: `用户注册注册`,
        user
      };
    }
  }
};

const getmail_Verification_code = async ctx => {
  let { mail } = ctx.query;
  let u = await ctx.db
    .collection(config.DB_user_users)
    .findOne({ mail }, { mail: 1 });
  //console.log(u)
  if (u) {
    let v_code = (Math.random() * 10000).toString().slice(0, 4);
    let sendID = await MailSend(mail, "Ladis", "重置密码", v_code);
    let messageId = sendID.messageId;
    let save_v_code = await ctx.db
      .collection(config.DB_user_users)
      .updateOne({ mail }, { $set: { messageId, v_code } }, { upsert: true });
    if (save_v_code.result && save_v_code.result.ok > 0) {
      ctx.body = formartBody("success", "验证码已发送，请打开邮件查看", {
        messageId
      });
    } else {
      ctx.body = formartBody("warn", "保存校验码出错，请联系管理员手工修改");
    }
  } else {
    ctx.body = formartBody("error", "此邮箱未注册");
  }
};

const resetpasswd = async ctx => {
  let { query } = ctx;
  let { Validation, mail, passwd, passwdck } = query;
  if (passwd == passwdck) {
    let pw = formatMD5(formatPasswd(passwd));
    let save_v_code = await ctx.db
      .collection(config.DB_user_users)
      .updateOne(
        { mail, v_code: Validation },
        { $set: { passwd: pw, modifyTime: formatDate(), v_code: null } }
      );
    if (save_v_code.result && save_v_code.result.n > 0) {
      ctx.body = formartBody(
        "success",
        "密码已完成修改，请自主选择下一步操作",
        ""
      );
      ctx.log = {
        type: config.DB_log_run,
        msg: `用户完成修改密码`,
        user: mail
      };
    } else {
      ctx.body = formartBody(
        "warn",
        "保存密码出错，请核对验证码是否出错，或刷新页面重试"
      );
    }
  } else {
    ctx.body = formartBody("warn", "二次输入密码不一致，请核对密码");
  }
};

/* 
phone modify_user_info_one
*/
/*  */
const modify_user_info_one = async ctx => {
  let { user, modifyType, modifyVal } = ctx.query;
  if (["mail", "orgin", "tel", "name"].includes(modifyType))
    ctx.body = formartBody("error", "请求修改类型错误", "");
  let SetVal = { [modifyType]: modifyVal };
  let result = await ctx.db
    .collection(config.DB_user_users)
    .updateOne({ user }, { $set: SetVal });
  ctx.body = formartBody("success", "arg modify success", result.result);
  ctx.log = {
    type: config.DB_log_run,
    msg: `修改个人信息，${modifyVal}|${modifyType}`,
    user
  };
};
/*  */
const Get_user_info_one = async ctx => {
  let { user } = ctx.query;
  let result = await ctx.db
    .collection(config.DB_user_users)
    .find({ user })
    .project({ _id: 0, passwd: 0, modifyTime: 0, token: 0, userGroup: 0 })
    .toArray();
  ctx.body = formartBody("success", "", result);
};
module.exports = {
  login,
  register,
  getmail_Verification_code,
  resetpasswd,
  modify_user_info_one,
  Get_user_info_one
};
