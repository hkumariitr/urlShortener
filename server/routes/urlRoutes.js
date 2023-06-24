const express = require("express");
const router = express.Router();
const {createShortUrl, getUrls, redirectUrl} = require("../controller/urlController")
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
router.route("/").get(validateToken,getUrls).post(validateToken,createShortUrl);

router.route("/:shortUrl").get(redirectUrl);


module.exports = router;