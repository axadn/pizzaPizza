const express = require('express');
const router = express.Router();
const User = require("./api/user_utils");
/* GET home page. */
router.get('/', function(req, res, next) {
  User.currentUser(req, user=>{
    debugger;
    res.render('index', { title: 'Pizza Pizza', currentUser: User.renderUser(user)});
  },next);
});

module.exports = router;
