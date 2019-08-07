const Koa = require('koa')
const KoaStatic = require('koa-static')
const path = require('path')
const Logger = require('koa-logger')
const cors = require('koa-cors')
const mongo = require('koa-mongo')
const body = require('koa-body')
const error = require('koa-error')

const config = require('./config')
const router = require('./router/index')
const saveLog = require('./util/SaveLog')

const app = new Koa()
app.context.log = {}
app.use(Logger())
app.use(saveLog())

app.use(cors())
app.use(mongo({ db: 'ladis',}))
app.use(body())
app.use(router.routes())
    .use(router.allowedMethods());

app.use(KoaStatic(path.join(__dirname,config.dist)))

app.use(error())

let port = config.development?config.development_port:config.port

app.listen(port, () => {
    console.log(`App listening on http:\/\/127.0.0.1:${port}`);
    console.log('App listening on router /api!');
    console.log('App listening on router /get');
    console.log('App listening on static');
});