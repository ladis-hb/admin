const Router = require('koa-router')
const router = new Router()

const Get = require('./Get')
const Api = require('./Api')

router.get('/Get/:id',Get)

router.post('/Api/:id',Api)



module.exports = router
