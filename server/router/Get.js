const crypt = require('crypto')

const { LoginUsers } = require('../../src/mock/data/user')
const config = require('../config')

module.exports = async ( ctx) => {
    var { params, query } = ctx
    // ctx.db === ctx.mongo.db('test')
    //console.log(await ctx.db.collection('pages').find({title:'head'}).toArray())
    switch (params.id) {
        case 'login':
            
            let { username, password } = query
            let user
            let hasUser = LoginUsers.some(u => {
                password = [...(Buffer.from(password, 'base64').toString())]
                            .slice(0, password.length - 14)
                            .join('')              
                            //console.log(password)
                if (u.username === username && u.password === password) {
                    user = JSON.parse(JSON.stringify(u));
                    user.password = undefined;
                    return true;
                }
            });
            if (hasUser) {
                ctx.body = { code: 200, msg: '请求成功', user }
            } else {                
                ctx.body = { code: 500, msg: '请求error' }
            }
            break
    }
}