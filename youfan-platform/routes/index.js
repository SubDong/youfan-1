var express = require('express');
var router = express.Router();

//
router.get("/login", function (req, res, next) {
    res.render("login.html", {});
});

router.get("/", function (req, res, next) {
    res.render("main.html",{});
});
router.get('/*.html', function (req, res, next) {
    console.log("go html")
    var url = req.url.substring(1);
    if (!url)
        url = "index";
    res.render((url.indexOf(".html")) > -1 ? url : url + ".html", {});
});

module.exports = router;
