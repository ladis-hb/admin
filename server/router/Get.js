const { formartBody, formatlog, Validation_user } = require('../util/Format')
const config = require('../config')

const { login, register, getmail_Verification_code, resetpasswd, } = require("./lib/user");
const { Dev_all_info, getUserInfo, addDevid, Get_devid_list, delete_Devid } = require('./lib/devs')
const { Run_log_warring, Get_user_info, } = require('./lib/log')
const { admin_get_info_list, modify_user_info } = require('./lib/administrator')

module.exports = async (ctx, next) => {
    let { params, query } = ctx
    let { token, user } = query
    if (!token) {
        switch (ctx.params.id) {
            case 'login':
                console.log('login')
                await login(ctx)
                break
            case 'register':
                await register(ctx)
                break
            case 'getmail_Verification_code':
                await getmail_Verification_code(ctx)
                break
            case 'resetpasswd':
                await resetpasswd(ctx)
                break
        }
    } else {
        //效验token是否有效
        let { status, u } = await Validation_user(ctx, { token, user })
        if (!status) {
            ctx.body = formartBody('error', 'Token已失效，请重新登录刷新Token')
        } else {
            switch (params.id) {
                case 'getUserInfo':
                    await getUserInfo(ctx, u)
                    break
                case 'Dev_all_info':
                    await Dev_all_info(ctx, u)
                    break

                case 'Run_log_warring':
                    await Run_log_warring(ctx)
                    break
                case 'Get_user_info':
                    await Get_user_info(ctx)
                    break

                case 'addDevid':
                    await addDevid(ctx, u)
                    break

                case 'Get_devid_list':
                    await Get_devid_list(ctx, u)
                    break

                case 'delete_Devid':
                    await delete_Devid(ctx, u)
                    break

                case 'admin_get_info_list':
                    await admin_get_info_list(ctx, u)
                    break
                case 'modify_user_info':
                    await modify_user_info(ctx, u)
                    break
            }
        }
    }
    await next()
}