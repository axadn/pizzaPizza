const express = require('express');
const router = express.Router();
const db = require("../../db");
const SqlString = require('sqlstring');
const AdminUtils = require('./admin_utils');
const Sizes = require("./size_utils");

module.exports = router;

router.post("/", function(req,res,next){
    AdminUtils.admin_route(req,res,
        authenticated =>{
            Sizes.create(req.params, success=>{
                res.json("success");
            },next);
        }
    ,next);
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
    AdminUtils.admin_route(req, res,
        authenticated=>{
            Sizes.update(req.params.id, req.body, success=>{
                res.json("success");
            }, next);
    }, next);
});

router.delete("/:id", function(req, res, next){
    AdminUtils.admin_route(req, res,
        authenticated=>{
            Sizes.delete(req.params.id, success=>{
                res.json("success");
            }, next);
    }, next);
});