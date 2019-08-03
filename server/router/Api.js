module.exports = async (ctx) => {
    ctx.db = ctx.mongo.db('dev')
    var { type, updateTime, data, dataType } = ctx.request.body

    if (['io', 'phase', 'th', 'ac', 'ups','power'].includes(type)) {
        if (dataType == 'One') {
            let res = await ctx.db.collection(type).insertOne(data)
            ctx.status = 200
            ctx.body = {
                code: 200, msg: `Data submission successful`,
                res: { insertedCount: res.insertedCount, insertedIds: res.insertedIds }
            }
            ctx.log = ctx.body
        } else if (dataType == 'Many') {
            let res = await ctx.db.collection(type).insertMany(data)
            ctx.status = 200
            ctx.body = {
                code: 201, msg: `Data submission successful`,
                res: { insertedCount: res.insertedCount, insertedIds: res.insertedIds }
            }
            ctx.log = ctx.body
        } else {
            ctx.status = 200
            ctx.body = { code: 202, msg: `dataType参数只接受/One/Many,区分大小写`, req: ctx.request.body }
            ctx.log = ctx.body
        }
    } else {
        ctx.status = 200
        ctx.body = { code: 203, msg: `type参数只接受'io', 'phase', 'th', 'ac', 'ups',区分大小写`, req: ctx.request.body }
        ctx.log = ctx.body
    }
}