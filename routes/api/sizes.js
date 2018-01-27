const express = require('express');
const router = express.Router();
const db = require("../../db");
const SqlString = require('sqlstring');
const AdminUtils = require('./admin_utils');
const Sizes = require("./size_utils");

router.post("/", function(req,res,next){
    AdminUtils.adminRoute(req,res,
        authenticated =>{
            Sizes.create(req.params, success=>{
                res.json("success");
            },next);
        }
    , next);
});

router.get("/", function(req,res,next){
    Sizes.index(sizes=>{
        const index = {};
        sizes.forEach(size=>{
            index[size.name] ={
                name: size.name,
                price: size.price
            };
        });
        res.json(index);
    }, next);
});

router.put("/:id", function(req, res, next){
    AdminUtils.adminRoute(req, res,
        authenticated=>{
            Sizes.update(req.params.id, req.body, success=>{
                res.json("success");
            }, next);
    }, next);
});

router.delete("/:id", function(req, res, next){
    AdminUtils.adminRoute(req, res,
        authenticated=>{
            Sizes.delete(req.params.id, success=>{
                res.json("success");
            }, next);
    }, next);
});

module.exports.index = function (done, onError){
    db.get().query(
        "SELECT * from sizes",
        (error, result, fields)=>{
            if(error) onError(error);
            else done(result);
        }
    );
}

module.exports = router;