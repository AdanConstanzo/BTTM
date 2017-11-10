// our index so we are going to link everything together
// with this file
var router = require("express").Router();

// links our routers to the server.js
router.use(require("./users"));
router.use(require("./sessions"));
router.use(require("./chat"));
router.use(require("./trading"));
<<<<<<< HEAD
//router.use(require("./transactions"));
=======
>>>>>>> back-end-dev-adan


module.exports = router;
