const crypto = require('crypto')
const config = require('../config')
/**
 *
 *
 * @param {*} status error:404,        success:200,        info:304,        warn:0 
 * @param {*} msg  string
 * @param {*} data body data
 * @returns
 */
const formartBody = (status, msg, data,log) => {
    let statu = {
        error: 404,
        success: 200,
        info: 304,
        warn: 0
    }
    let body = data || {}
     msg = (typeof (msg) == 'string') ? msg : ''
     log = log || false     
    return { code: statu[status], msg: msg, data: body ,log}
}

/**
 *
 *
 * @param {*} passwd 密码
 * @returns 减去后加的随机码，还原纯数字
 */
const formatPasswd = (passwd) => {
    if (typeof (passwd) == 'string') {
        return [...(Buffer.from(passwd, 'base64').toString())]
            .slice(0, passwd.length - 14)
            .join('')
    } else {
        return false
    }
}

/**
 *
 *
 * @param {*} passwd 纯数字密码
 * @returns  md5加密
 */
const formatMD5 = (passwd) => {
    var md5 = crypto.createHash('md5')
    md5.update(String(passwd))
    md5.update(config.key)
    return md5.digest('hex')
}

/**
 *
 *
 * @returns 返回格式化的日期 1990-01-01 12:12:12
 */
const formatDate = () => {
    let dates = new Date()
    let date = `${dates.getFullYear()}/${dates.getMonth() + 1}/${dates.getDate()}`
    let time = `${dates.getHours()}:${dates.getMinutes()}:${dates.getSeconds()}:${dates.getMilliseconds()}`
    return `${date} ${time}`
}

/*
 *
 *
 *  @param {*} status 日志状态
 * @param {*} msg    日志信息
 * @param {*} data   携带数据
 * @param {*} users  用户
 * @returns
 */
const formatlog = (status, msg, data,user) => {
    return {
        status: status,
        msg: msg,
        data: data,
        user:user || 'no record',
        generateTime: formatDate()
    }
}

/**
 *
 *
 * @param {*} ctx   ctx句柄
 * @param {*} data  包含token and user
 * @returns
 */
const Validation_user = async (ctx, data) => {
    let { user, token } = data
    ctx.db = ctx.mongo.db(config.DB_user)
    let s = await ctx.db.collection('users').findOne({ name: user, token })
    if (s) status = true
    else status = false
    let result = {
        status,
        u: user,
    }
    return result
}

module.exports = { formartBody, formatPasswd, formatMD5, formatDate, formatlog, Validation_user }