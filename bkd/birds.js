var express = require("express");
var router = express.Router();

var openRouter = express.Router();

// define the home page route
router.get("/", function(req, res) {
  console.log(" birds/");
  res.send("Birds home page");
});
// define the about route
router.get("/bout", function(req, res) {
  console.log("birds/bout", +new Date());
  res.send("About birds11");
});

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// console.log(' router:  ',router,' router.handle:',router.handle);

// customizing the behavior of router.param()
router.param(function(param, option) {
  // console.log("  param, option:", param, option);
  return function(req, res, next, val) {
    console.log(
      arguments[3],
      " val:",
      val,
      +new Date(),
      val == option,
      arguments.length,
      arguments[4]
    );
    if (val == option) {
      console.log("------->next");
      next();
    } else {
      console.log("------->not");
      next();
      // res.sendStatus(403);
    }
  };
});

// using the customized router.param()
router.param("id", 1337);

// route to trigger the capture
router.get("/user/:id", function(req, res) {
  console.log(" /user/:id", +new Date());
  // res.end();
  res.send("OK");
});

router.param("user_id", function(req, res, next, id) {
  console.log(1);
  // sample user, would actually fetch from DB, etc...
  next();
});

var a, b, c;
router
  .route("/users/:user_id")
  .all(function(req, res, next) {
    console.log(`a:${a};b：${b};c:${c}`);
    a = req;
    req.user = {
      id: 12,
      name: "TJ"
    };
     let {params,params:{user_id}} = req;
     req.user.id = user_id;
     console.log(' params:',params,' user_id:',user_id);
    console.log(2, +new Date(),req.param,req.params);
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(function(req, res, next) {
    b = req;
    console.log("3 a===b:", a === b, req.user, +new Date());
    // console.log( 3,req);
    // res.json({ s: "req.user", b: [234] });
    res.json(req.user);
  })
  .put(function(req, res, next) {
    console.log(4);
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post(function(req, res, next) {
    console.log(5);
    next(new Error("not implemented"));
  });
// .delete(function(req, res, next) {
//   console.log( 6)
//   next(new Error('not implemented'));
// });

// app.use(router);

module.exports = router;
