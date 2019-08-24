/* jshint esversion:8 */
const config = require("../../config");
const { formartBody } = require("../../util/Format");

const Run_log_warring = async ctx => {
  let run = await ctx.db
    .collection(config.DB_log_run)
    .findMany()
    .limit(limit)
    .sort({ generateTime: -1 });
  ctx.body = formartBody("success", "run log find new date," + limit, run);
};

const Get_user_info = async ctx => {
  let { type, user } = ctx.query;
  let collection = "";
  let q = user == "admin" || user == "no record" ? {} : { user: user };
  switch (type) {
    case "runInfo":
      collection = config.DB_log_run;
      break;
    case "errorInfo":
      collection = config.DB_log_error;
      break;

    case "devInfo":
      collection = config.DB_log_dev;
      break;

    case "socketInfo":
      collection = config.DB_log_socket;
      break;
  }

  let run = await ctx.db
    .collection(collection)
    .find(q)
    .sort({ generateTime: -1 })
    .project({ _id: 0, query: 0 })
    .toArray();
  ctx.body = formartBody("success", "", run);
};

module.exports = { Run_log_warring, Get_user_info };
