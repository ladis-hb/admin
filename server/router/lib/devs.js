const config = require('../../config')
const { formartBody, formatlog } = require('../../util/Format')

const Dev_all_info = async (ctx, u) => {
    let devArray = await ctx.db.collection(config.DB_user_dev)
        .findOne({ user: u })
    if (devArray) {
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

const getUserInfo = async (ctx, u) => {
    let { pic } = await ctx.db.collection(config.DB_user_users)
        .findOne({ name: u }, { pic: 1 })
    ctx.body = formartBody('success', '', { pic })
}

const addDevid = async (ctx, u) => {
    let {query} = ctx
    let { devid, devType } = ctx.query
    let result = await ctx.db.collection(config.DB_user_dev)
        .updateOne({ user: u }, { $addToSet: { dev: { type: devType, devid } } }, { upsert: true })
    ctx.body = formartBody('success', '添加数据完成', result.result, formatlog(config.log_addDevid, `添加设备 ID：${devid}，类型：${devType}`, query, u))
    //添加了新的设备发送事件提醒刷新设备数组
    ctx.event.emit('adddevs', { devid, devType, u })

}

const Get_devid_list = async (ctx, u) => {
    let result = await ctx.db.collection(config.DB_user_dev)
        .findOne({ user: u }, { dev: 1 })
    ctx.body = formartBody('success', '', result)
}

const delete_Devid = async (ctx, u) => {
    let {query} = ctx
    let { devid } = ctx.query
    let result = await ctx.db.collection(config.DB_user_dev)
        .updateOne({ user: u }, { $pull: { dev: { devid } } })
    ctx.body = formartBody('success', '', result.result, formatlog(config.log_delDevid, `删除了设备，ID：${devid}`, query, u))
    ctx.event.emit('deldevs', { devid })
}

module.exports = { Dev_all_info, getUserInfo, addDevid, Get_devid_list, delete_Devid }