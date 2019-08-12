const config = require('../config.js')
/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
module.exports = function () {
    return async (ctx, next) => {
        await next()
        let {log} = ctx.body
        if(log){
            let { generateTime, status, msg, data ,user} = log
            ctx.db = ctx.mongo.db(config.DB_log)
            let collection
            switch (status) {
                case 'loginSuccess':
                case 'registerSuccess':
                case 'resetpwSuccess':
                    collection = ctx.db.collection(config.DB_log_run)
                    break

                case 'loginError':
                case 'registerError':
                    collection = ctx.db.collection(config.DB_log_error)
                    break

                case 'addDevid':
                case 'delDevid':
                        collection = ctx.db.collection(config.DB_log_dev)
                    break

                    default:
                            collection = ctx.db.collection(config.DB_log_other)
                    break
            }

            collection.insertOne({ generateTime, status, msg, data ,user})
        }
       
        ctx.body.log = false
    }


}