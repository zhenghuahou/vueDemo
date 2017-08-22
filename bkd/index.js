import nodemon from 'nodemon'
nodemon({
    script: `${__dirname}/app.js`,
    watch: [`${__dirname}/api`,`${__dirname}/app.js`,`${__dirname}/*.js`],
    ext: 'js json',
    execMap: {
        'js': 'babel-node --presets=env,stage-0'
    }
}).on('crash', function () {
    console.error('nodemon crashed!请重启')
}).on('quit', function() {
    // console.log(" process.pid:",process.pid,' process:',process);
    process.kill(process.pid)
}).on('restart', function (files) {
    console.log(' file:',file);
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`bkd-server restarting due to [${files.map(file => file.replace(`${__dirname}/`, ''))}]`)
})

// 防止进程意外退出
process.on('uncaughtException', function (err) {
    // console.log(err);
    // console.log(err.stack);
});
