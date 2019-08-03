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
const formartBody = (status, msg, data) => {
    var statu = {
        error: 404,
        success: 200,
        info: 304,
        warn: 0
    }
    var body = data || {}
    var msg = (typeof (msg) == 'string') ? msg : ''
    return { code: statu[status], msg: msg, data: body }
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

const formatDate = () => {
    let dates = new Date()
    let date = `${dates.getFullYear()}.${dates.getMonth() - 1}.${dates.getDay()}`
    let time = `${dates.getHours()}:${dates.getMinutes()}:${dates.getSeconds()}`
    return `${date} ${time}`
}

const formatlog = (status, msg, data) => {
    return {
        status: status,
        msg: msg,
        data: data,
        time:formatDate()
    }
}

module.exports = { formartBody, formatPasswd, formatMD5, formatDate, formatlog }