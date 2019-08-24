/* jshint esversion:8 */
const config = require("../config.js");
const { formatDate } = require("../util/Format.js");
module.exports = function() {
  return async (ctx, next) => {
    if (ctx.query.length > 0) {
      ctx.log = {};
    }
    await next();
    if (!ctx.log) return true;
    if (!ctx.log.type) return true;
    let generateTime = formatDate();
    let { type, status, msg, query, user } = ctx.log;
    type = type || config.DB_log_other;
    status = status || ctx.params.id;
    query = query || ctx.query;
    user = user || ctx.query.user;
    {
      if (
        ![
          config.DB_log_other,
          config.DB_log_dev,
          config.DB_log_error,
          config.DB_log_run,
          config.DB_log_socket
        ].includes(type)
      )
        type = config.DB_log_other;
    }
    //console.log({ type, generateTime, status, msg, query, user });
    ctx.db
      .collection(type)
      .insertOne({
        generateTime,
        status,
        msg,
        query,
        user,
        updateTime: new Date()
      });
  };
};
