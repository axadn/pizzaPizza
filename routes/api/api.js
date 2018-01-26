const express = require('express');
const router = express.Router();
const users = require('./users');
const sizes = require('./sizes');
const toppings = require("./toppings");
const session = require("./session");

router.use("/users", users);
router.use('/sizes', sizes);
router.use('/toppings', toppings);
router.use('/session', session);

module.exports = router;