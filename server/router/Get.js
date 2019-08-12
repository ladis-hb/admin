const crypto = require('crypto')
const { formartBody, formatPasswd, formatMD5, formatDate, formatlog, Validation_user } = require('../util/Format')
const { LoginUsers } = require('../../src/mock/data/user')
const MailSend = require('../util/MailSend')
const config = require('../config')

const sha1 = crypto.createHash('sha1')

module.exports = async (ctx, next) => {
    var { params, query } = ctx
    if (['login', 'register', 'getmail_Verification_code', 'resetpasswd'].includes(params.id)) {
        ctx.db = ctx.mongo.db(config.DB_user)
        switch (params.id) {
            case 'login':
                {
                    let { username, password } = query
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
                break

            case 'getmail_Verification_code':
                {
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

                break

            case 'resetpasswd':
                {
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
                break

            case 'getUserInfo':
                {
                    let { token, user } = query
                    let { status, u } = await Validation_user(ctx, { token, user })
                    if (status) {
                        let { pic } = await ctx.db.collection(config.DB_user_users)
                            .findOne({ name: u })
                        ctx.body = formartBody('success', '', { pic })
                    }
                }
                break
        }
    }
    //home pages get
    if (['Dev_all_info', 'getUserInfo'].includes(params.id)) {
        //效验token是否有效
        let { token, user } = query
        let { status, u } = await Validation_user(ctx, { token, user })
        if (!status) {
            ctx.body = formartBody('error', 'Token已失效，请重新登录刷新Token')
        } else {
            ctx.db = ctx.mongo.db(config.DB_user)
            switch (params.id) {
                case 'getUserInfo':
                    {
                        let { pic } = await ctx.db.collection(config.DB_user_users)
                            .findOne({ name: u }, { pic: 1 })
                        ctx.body = formartBody('success', '', { pic })
                    }
                    break
                case 'Dev_all_info':
                    {
                        let devArray = await ctx.db.collection(config.DB_user_dev)
                            .findOne({ user: u })
                        if (devArray) {
                            ctx.db = ctx.mongo.db(config.DB_dev)
                            let devs = {}
                            //遍历user_dev表，汇总分类设备                        
                            devArray.dev.map(val => {
                                if (!devs[val.type]) devs[val.type] = []
                                devs[val.type].push(val.devid)
                            })


                            for (let key in devs) {
                                devs[key] = await ctx.db.collection(key)
                                    .find({ devid: { $in: devs[key] } }, { _id: 0 })
                                    .toArray()
                            }
                            ctx.body = formartBody('success', '', devs)
                        } else {
                            ctx.body = formartBody('error', '用户没有添加devs')
                        }
                    }
                    break
            }
        }

    }

    //想不出来客户有啥日志可以显示的，暂时搁置
    if (['Run_log_warring', 'Get_user_info'].includes(params.id)) {
        //效验token是否有效
        let { token, user } = query
        let { status, u } = await Validation_user(ctx, { token, user })
        if (!status) {
            ctx.body = formartBody('error', 'Token已失效，请重新登录刷新Token')
        } else {
            ctx.db = ctx.mongo.db(config.DB_log)
            switch (params.id) {
                case 'Run_log_warring':
                    {
                        let run = await ctx.db.collection(config.DB_log_run)
                            .findMany()
                            .limit(limit)
                            .sort({ generateTime: -1 })
                        ctx.body = formartBody('success', 'run log find new date,' + limit, run)
                    }
                    break
                case 'Get_user_info':
                    {
                        let { type } = query
                        let collection = ''
                        let q = (user == 'admin' || user == 'no record') ? {} : { "user": user }
                        switch (type) {
                            case 'runInfo':
                                collection = config.DB_log_run
                                break
                            case 'errorInfo':
                                collection = config.DB_log_error
                                break

                            case 'devInfo':
                                collection = config.DB_log_dev
                                break

                            case 'socketInfo':
                                collection = config.DB_log_socket
                                break
                        }
                        console.log(q)
                        let run = await ctx.db.collection(collection)
                            .find(q)
                            .sort({ generateTime: -1 })
                            .project({ _id: 0, data: 0 })
                            .toArray()
                        ctx.body = formartBody('success', '', run)
                    }
                    break
            }
        }
    }
    //add devs
    if (['addDevid', 'Get_devid_list', 'delete_Devid'].includes(params.id)) {
        //效验token是否有效
        let { token, user } = query
        let { status, u } = await Validation_user(ctx, { token, user })
        if (!status) {
            ctx.body = formartBody('error', 'Token已失效，请重新登录刷新Token')
        } else {
            switch (params.id) {
                case 'addDevid':
                    {
                        let { devid, devType } = query
                        ctx.db = ctx.mongo.db(config.DB_user)
                        let result = await ctx.db.collection(config.DB_user_dev)
                            .updateOne({ user }, { $addToSet: { dev: { type: devType, devid } } }, { upsert: true })
                        ctx.body = formartBody('success', '添加数据完成', result.result, formatlog(config.log_addDevid, `添加设备 ID：${devid}，类型：${devType}`, query, user))
                        //添加了新的设备发送事件提醒刷新设备数组
                        ctx.event.emit('adddevs', { devid, devType, user })

                    }
                    break
                case 'Get_devid_list':

                    {
                        ctx.db = ctx.mongo.db(config.DB_user)
                        let result = await ctx.db.collection(config.DB_user_dev)
                            .findOne({ user }, { dev: 1 })
                        ctx.body = formartBody('success', '', result)
                    }
                    break

                case 'delete_Devid':
                    {
                        let { devid } = query
                        ctx.db = ctx.mongo.db(config.DB_user)
                        let result = await ctx.db.collection(config.DB_user_dev)
                            .updateOne({ user }, { $pull: { dev: { devid } } })
                        ctx.body = formartBody('success', '', result.result, formatlog(config.log_delDevid, `删除了设备，ID：${devid}`, query, user))
                        ctx.event.emit('deldevs', { devid })
                    }
                    break
            }
        }
    }

    //admin pages
    if (['admin_get_info_list', 'modify_user_info'].includes(params.id)) {
        let { token, user } = query
        let { status, u } = await Validation_user(ctx, { token, user })
        if (!status) {
            ctx.body = formartBody('error', 'Token已失效，请重新登录刷新Token')
        } else {
            switch (params.id) {
                case 'admin_get_info_list':
                    {
                        let { index } = query
                        switch (index) {
                            case 'usersList':
                                let users = await ctx.mongo.db(config.DB_user).collection(config.DB_user_users)
                                    .find()
                                    .project({ _id: 0, creatTime: 1, name: 1, mail: 1, tel: 1, address: 1, orgin: 1 })
                                    .toArray()
                                ctx.body = formartBody('success', '', users)
                                break
                            case "ups":
                            case "ac":
                            case "power":
                            case "io":
                            case "th":
                                let devs = await ctx.mongo.db(config.DB_dev).collection(index)
                                    .find()
                                    .project({ _id: 0, generateTime: 1, name: 1, devid: 1, brand: 1 })
                                    .toArray()
                                let devs_Set = new Set()
                                let devs_serize = [];
                                (devs.reverse()).map(val=>{
                                    if(!devs_Set.has(val.devid)){
                                        devs_Set.add(val.devid)
                                        devs_serize.push(val)
                                    }
                                })
                                ctx.body = formartBody('success', '', devs_serize)
                                break
                        }
                    }
                    break
                case 'modify_user_info':
                    {
                        let { mail, name, orgin, tel } = query
                        let result = await await ctx.mongo.db(config.DB_user).collection(config.DB_user_users)
                            .updateOne({ mail }, { $set: { name, orgin, tel } }, { upsert: true })
                        ctx.body = formartBody('success', '', result)
                    }
                    break
            }



        }
    }
    await next()
}