import express from 'express'
import ip from 'ip'
import chalk from 'chalk'

import fs from 'fs'
import lowdb from 'lowdb'
import config from '../config'

const app = express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Content-Type",`application/json; charset=utf-8`);
    if(req.method == "OPTIONS") {
        res.sendStatus(200) // 让options请求快速返回
    } else {
        next()
    }
})

app.listen(config.bkdServerPort, function () {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(`bkd-server at ${chalk.magenta.underline(`http://${ip.address()}:${this.address().port}/`)}`)
})

app.get('/random.text', function (req, res) {
    console.log(' arg:',res.send,' \n res.header---->',res.header)
  res.send('root');
});



// API router
const apiRouter = express.Router();

//http://expressjs.com/zh-cn/guide/routing.html
app.use('/api',apiRouter); //这一行加进去，下面 //1处 的apiRouter配置才能生效
apiRouter.get('/test',function(req,res){ //1
    res.send(' apiRouter test')
});
// app.use('/api', apiRouter)
/*
console.log(' apiRouter.get:',apiRouter.get);
 apiRouter.get: function (path){
    var route = this.route(path)
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  }
 */ 

/*
// console.log(' ########app:',app,'  apiRouter:',apiRouter);
 ########app: function (req, res, next) {
    app.handle(req, res, next);
  }   apiRouter: function router(req, res, next) {
    router.handle(req, res, next);
  }
*/
// IMG router
// const imgRouter = express.Router()
// app.use('/img', imgRouter) // sharp
// app.use('/img', express.static(`${__dirname}/img`))

// 遍历目录并执行文件，你不再需要在手动引入
const walkDirAndRequire = function (dir, router) {
    try {
        let hasIndexJs = false, hasDbJson = false
        fs.readdirSync(dir).forEach((fname) => {
            const path = `${dir}/${fname}`
            if (fs.statSync(path).isDirectory()) {
                walkDirAndRequire(path, router)
            } else if (fname === 'index.js') {
                hasIndexJs = true
            } else if (fname === 'db.json') {
                hasDbJson = true
            }
        })
        if (hasIndexJs) {
            let db // 数据库
            if (hasDbJson) {
                db = lowdb(`${dir}/db.json`)
            } else {
                db = lowdb() // 基于内存的DB
            }
            // console.log(' walkDirAndRequire:',' ${dir}/index:',`${dir}/index`);
            console.warn(' 123---->',require(`${dir}/index`).default)
            // require(`${dir}/index`).default(router, db)
            require(`${dir}/index`).default(app, db)
        }
    } catch (err) {
        console.log(err)
    }
}
walkDirAndRequire(`${__dirname}/api`, apiRouter)
// walkDirAndRequire(`${__dirname}/img`, imgRouter)
