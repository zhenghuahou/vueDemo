export default function (router, db) {
    router.get('/myorder', function (req, res, next) {
        let {callback} = req.query;
        const jsonData = db.get('myorder').value();
        // res.writeHead(200, {"Content-Type": `application/json; charset=utf-8`});//起作用
        if(callback){  //jsonp
             var str = `${callback}(${JSON.stringify(jsonData)})`;
             res.end(str);
             return;
        }
        res.json(jsonData);
    })
}
