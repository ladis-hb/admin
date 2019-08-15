const config = require('../../config')
const { formartBody, formatPasswd, formatMD5, formatDate, formatlog, Validation_user } = require('../../util/Format')
const MailSend = require('../../util/MailSend')


const login = async (ctx) => {
    let { params, query } = ctx
    let { username, password } = ctx.query
    let u = await await ctx.db.collection(config.DB_user_users)
        .findOne({ $or: [{ name: username }, { mail: username }] }, { name: 1, mail: 1, _id: 0 })
    if (u) {
        let { name, passwd, mail } = u
        if ((name == username || mail == username) && passwd == formatMD5((formatPasswd(password)))) {
            //添加token
            let token = formatMD5(Date.now())
            await ctx.db.collection(config.DB_user_users)
                .updateOne({ name, mail }, { $set: { token, address: (ctx.ip.split(':').reverse())[0] } }, { upsert: true })
            ctx.body = formartBody('success', '用户登录成功', { user: name, route: '/main', token }, formatlog(config.log_loginSuccess, '用户登录成功', query, username))
        } else {
            ctx.body = formartBody('error', '用户名或密码错误', '', formatlog(config.log_loginError, '用户登录失败-用户名或密码错误', query, username))
        }

    } else {
        ctx.body = formartBody('error', '用户名错误', '', formatlog(config.log_loginError, '用户登录失败-没有检索到用户名', query))        
    }
}

const register = async ctx => {
    let { params, query } = ctx
    let { name, passwd, passwdck, mail, orgin, tel } = ctx.query
    if (typeof (name) != 'string' || name.length > 20) ctx.body = formartBody('error', '名称格式错误')
    if (typeof (passwd) != 'string' || passwd.length > 50) ctx.body = formartBody('error', '密码格式错误')
    if (passwd != passwdck) ctx.body = formartBody('error', '密码不一致')
    for (let val of [mail, orgin, tel]) {
        if (typeof (val) != 'string' || val.length > 40) ctx.body = formartBody('error', '格式错误', val)
    }


    if (!ctx.body) {
        let u = await ctx.db.collection(config.DB_user_users)
            .findOne({ $or: [{ name }, { mail }] })
        if (u) {
            ctx.body = formartBody('warn', '用户名或邮箱已被注册，请使用未被注册的用户', '', formatlog(config.log_registerError, '用户名或邮箱已被注册', query, name))
        } else {
            let user = {
                name,
                passwd: formatMD5((formatPasswd(passwd))),
                mail,
                orgin,
                tel,
                creatTime: formatDate(),
                modifyTime: formatDate(),
                address: (ctx.ip.split(':').reverse())[0],
            }
            let result = await ctx.db.collection(config.DB_user_users)
                .insertOne(user)
            ctx.body = formartBody('success', 'register success', result.result, formatlog(config.log_registerSuccess, '用户注册成功', query, name))
        }
    }
}

const getmail_Verification_code = async ctx => {
    let { params, query } = ctx
    let { mail, name } = query
    let u = await ctx.db.collection(config.DB_user_users)
        .findOne({ mail }, { mail: 1 })
    //console.log(u)                 
    if (u) {
        let v_code = (Math.random() * 10000).toString().slice(0, 4)
        let sendID = await MailSend(mail, 'Ladis', '重置密码', v_code)
        let messageId = sendID.messageId
        let save_v_code = await ctx.db.collection(config.DB_user_users)
            .updateOne({ mail }, { $set: { messageId, v_code } }, { upsert: true })
        if (save_v_code.result && save_v_code.result.ok > 0) {
            ctx.body = formartBody('success', '验证码已发送，请打开邮件查看', { messageId }, formatlog(config.log_resetpwSuccess, '用户请求重置密码', { messageId, v_code, query }, name))
        } else {
            ctx.body = formartBody('warn', '保存校验码出错，请联系管理员手工修改')
        }
    } else {
        ctx.body = formartBody('error', '此邮箱未注册')
    }
}

const resetpasswd = async ctx => {
    let { params, query } = ctx
    let { Validation, mail, passwd, passwdck } = query
    if (passwd == passwdck) {
        let pw = formatMD5((formatPasswd(passwd)))
        let save_v_code = await ctx.db.collection(config.DB_user_users)
            .updateOne({ mail, v_code: Validation }, { $set: { passwd: pw, modifyTime: formatDate() }, v_code: '' }, { upsert: true })
        if (save_v_code.result && save_v_code.result.ok > 0) {
            ctx.body = formartBody('success', '密码已完成修改，请自主选择下一步操作', '', formatlog(config.log_resetpwSuccess, '用户完成修改密码', mail))
        } else {
            ctx.body = formartBody('warn', '保存密码出错，请联系管理员手工修改')
        }
    } else {
        ctx.body = formartBody('warn', '二次输入密码不一致，请核对密码')
    }
}
const getUserInfo = async ctx => {
    let { token, user } =ctx.query
    let { status, u } = await Validation_user(ctx, { token, user })
    if (status) {
        let { pic } = await ctx.db.collection(config.DB_user_users)
            .findOne({ name: u })
        ctx.body = formartBody('success', '', { pic })
    }
}
module.exports = { login, register, getmail_Verification_code, resetpasswd, getUserInfo, }