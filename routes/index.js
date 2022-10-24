var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // NOTE: Formerly was render, but this is for template engine to return finished HTML pages. So replacing with res.send
  // res.render("index", { title: "Express" })
  res.send({ title: 'Express' });
});

module.exports = router;
