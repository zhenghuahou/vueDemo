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

// always invoked
// app.use(function(req, res, next) {
//   res.send('Hello World app.uses');
// });

app.get('/rbd', function (req, res) {
    console.log(' arg:',res.send,' \n res.header---->',res.header)
  res.send('root');
});

app.all('/', function (req, res) {
  res.send('Got a POST request!!');
});




// app.get(/a/, function(req, res,next) {
//     console.log(' /a/',+new Date);
// //   res.send('/a/');
// res.jsonp({"a":21,"b":[23]});
//   res.end();
//   next();//多个回调函数可以处理一个路由（确保您指定 next 对象）
// });

app.get('/ab*cd', function(req, res) {
    console.log('ab*cd',+new Date);
//   res.send('ab*cd');
});


app.get(/.*fly$/, function(req, res,next) {
    console.log(' 多个回调函数01')
    // console.log(' arg:',arguments);
  res.send('/.*fly$/');
  next();
},function(){
    console.log('the response will be sent by the next function ...02');
});


var cb0 = function (req, res, next) {
  console.log('CB0',+new Date);
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1',+new Date);
  next();
}

var cb2 = function (req, res,next) {
    console.log("CB2",+new Date);
    next();
//   res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2],function(req,res,next){
    console.log('wonderful',+new Date);
    next();
    // console.log(' args:',arguments);
},function(){
    console.log('end!!!',+new Date);
});



var birds = require('./birds');
var openRouter = express.Router();


openRouter.get('/testhuazi', function(req, res, next) { 
  // ... View user ... 
  res.send('openRouter test！');
})

// ...
app.use('/birds', birds);
app.use( openRouter);

const apiRouter = express.Router();

var debug = require('debug')('app');


console.log(typeof process !== 'undefined' && process.type === 'renderer',' process.type:',process.type);


// debug.enabled = true;
debug('goes to stderr!');
// console.log(' debug:',debug);
debug('booting %o', 'My App');
//http://expressjs.com/zh-cn/guide/routing.html
app.use('/api',apiRouter); //这一行加进去，下面 //1处 的apiRouter配置才能生效
apiRouter.get('/test',function(req,res){ //
    console.log(111111,debug,' debug.enabled:',debug.enabled);
    // debug.enabled = true;
    debug(`req.method:${req.method}---req.url:${req.url}`);
    res.send(' apiRouter test 1233')
});




// console.log(' app.use:::::', app.use );
// console.log(' apiRouter.use::::',apiRouter.use);
// console.log(' apiRouter.get:',apiRouter.get);
// console.log(' apiRouter.post:',apiRouter.post,apiRouter.get=== apiRouter.post);
// console.log(' apiRouter.head:',apiRouter.head)
// // app.use('/api', apiRouter)
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
            // console.warn(' 123---->',require(`${dir}/index`).default)
            // require(`${dir}/index`).default(router, db)
            require(`${dir}/index`).default(app, db)
        }
    } catch (err) {
        console.log(err)
    }
}
walkDirAndRequire(`${__dirname}/api`, apiRouter)
// walkDirAndRequire(`${__dirname}/img`, imgRouter)
