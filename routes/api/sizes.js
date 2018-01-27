const express = require('express');
const router = express.Router();
const db = require("../../db");
const SqlString = require('sqlstring');
const AdminUtils = require('./admin_utils');

module.exports = router;

router.post("/", function(req,res,next)=>{
    AdminUtils.admin_route(req,res,
        
    , next);
});