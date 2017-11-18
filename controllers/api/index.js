// our index so we are going to link everything together
// with this file
var router = require("express").Router();

// links our routers to the server.js
router.use(require("./users"));
router.use(require("./sessions"));
router.use(require("./chat"));
router.use(require("./trading"));
router.use(require("./transactionsCompleted"));
router.use(require("./transactionsPending"));
router.use(require("./geo"));
router.use(require("./offer"));
router.use(require("./reservation"));
router.use(require("./itemSearch"));
router.use(require("./messageList"));

module.exports = router;
