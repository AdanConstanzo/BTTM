// our index so we are going to link everything together
// with this file
var router = require("express").Router();

// links our routers to the server.js
router.use(require("./users"));
router.use(require("./sessions"));
router.use(require("./chat"));
router.use(require("./trading"));
<<<<<<< HEAD
router.use(require("./transactionsCompleted"));
router.use(require("./transactionsPending"));
=======
>>>>>>> f5b09ecef4756c18f037a4f86c5d4660fddf6873


module.exports = router;
