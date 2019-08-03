const crypto = require('crypto')
const { formartBody, formatPasswd, formatMD5, formatDate, formatlog } = require('../util/Format')
const { LoginUsers } = require('../../src/mock/data/user')
const MailSend = require('../util/MailSend')
const config = require('../config')

const sha1 = crypto.createHash('sha1')

module.exports = async (ctx, next) => {
    var { params, query } = ctx
    if (['login', 'register'].includes(params.id)) {
        ctx.db = ctx.mongo.db(config.DB_user)
        switch (params.id) {
            case 'login':
                {
                    let { username, password } = query
                    let u = await await ctx.db.collection('users').findOne({ $or: [{ name: username }, { mail: username }] })
                    if (u) {
                        let { name, passwd, mail } = u
                        if ((name == username || mail == username) && passwd == formatMD5((formatPasswd(password)))) {
                            ctx.body = formartBody('success', '用户登录成功', { user: name })
                            ctx.log = formatlog('loginSuccess', '用户登录成功', query)
                        } else {
                            ctx.body = formartBody('error', '用户名或密码错误')
                            ctx.log = formatlog('loginError', '用户登录失败-用户名或密码错误', query)
                        }

                    } else {
                        ctx.body = formartBody('error', '用户名错误')
                        ctx.log = formatlog('loginError', '用户登录失败-没有检索到用户名', query)
                    }
                }
                break

            case 'register':
                {
                    let { name, passwd, passwdck, mail, orgin, tel } = ctx.query
                    if (typeof (name) != 'string' || name.length > 20) ctx.body = formartBody('error', '名称格式错误')
                    if (typeof (passwd) != 'string' || passwd.length > 50) ctx.body = formartBody('error', '密码格式错误')
                    if (passwd != passwdck) ctx.body = formartBody('error', '密码不一致')
                    for (let val of [mail, orgin, tel]) {
                        if (typeof (val) != 'string' || val.length > 40) ctx.body = formartBody('error', '格式错误', val)
                    }


                    if (!ctx.body) {
                        let u = await ctx.db.collection('users').findOne({ $or: [{ name }, { mail }] })
                        if (u) {
                            ctx.body = formartBody('warn', '用户名或邮箱已被注册，请使用未被注册的用户')
                            ctx.log = formatlog('registerError', '用户名或邮箱已被注册', query)
                        } else {
                            let user = {
                                name,
                                passwd: formatMD5((formatPasswd(passwd))),
                                mail,
                                orgin,
                                tel,
                                creatTime: formatDate(),
                                modifyTime: formatDate(),
                                address: ctx.ip,
                            }
                            let result = await ctx.db.collection('users').insertOne(user)
                            ctx.body = formartBody('success', 'register success', result.result)
                            ctx.log = formatlog('registerSuccess', '用户注册成功', query)
                        }
                    }

                }
                break

            case 'getmail':
                {
                    let { mail, name } = query
                    let u = await ctx.db.collection('users').findOne({ name, mail })
                    if (u) {
                        let sendID = await MailSend(mail, 'Ladis', '重置密码', 1024)
                        ctx.body = formartBody('success', '验证码已发送，请打开邮件查看', { sendID })
                    }
                }

                break
        }
        await next()
    }
}