const express = require('express');
const router = express.Router();
const User = require("./api/user_utils");
/* GET home page. */
router.get('/', function(req, res, next) {
  User.currentUser(req, user=>{
    let renderedUser;
    if(user){
      renderedUser = User.renderUser(user);
    }
    else{
      renderedUser = "";
    }
    res.render('index', { title: 'Pizza Pizza', currentUser: renderedUser });
  },next);
});

module.exports = router;
