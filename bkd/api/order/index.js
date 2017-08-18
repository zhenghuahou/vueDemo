export default function (router, db) {
    router.get('/myorder', function (req, res, next) {
        // res.writeHead(200, {"Content-Type": `application/json; charset=utf-8`});
        res.json(db.get('myorder').value());
    })
}
