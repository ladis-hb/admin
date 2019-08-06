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
        if (ctx.log.status) {
            let { generateTime, status, msg, data } = ctx.log
            ctx.db = ctx.mongo.db(config.DB_log)
            let collection = ctx.db.collection(config.DB_log_run)
            switch (status) {
                case ['loginSuccess', 'registerSuccess', 'resetpwSuccess',]:
                    collection = ctx.db.collection(config.DB_log_run)
                    break

                case ['loginError', 'registerError',]:
                    collection = ctx.db.collection(config.DB_log_error)
                    break
            }

            collection.insertOne(ctx.log)
        }
    }


}