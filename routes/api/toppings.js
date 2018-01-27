const express = require('express');
const router = express.Router();
const db = require("../../db");
const SqlString = require('sqlstring');
const AdminUtils = require('./admin_utils');
const Toppings = require("./topping_utils");

router.post("/", function(req,res,next){
    AdminUtils.adminRoute(req,res,
        authenticated =>{
            Toppings.create(req.params, idInfo=>{
                res.json(idInfo);
            },next);
        }
    ,next);
});

router.get("/", function(req,res,next){
    Toppings.index(toppings=>{
        const index = {};
        toppings.forEach(size=>{
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
            Toppings.update(req.params.id, req.body, success=>{
                res.json("success");
            }, next);
    }, next);
});

router.delete("/:id", function(req, res, next){
    AdminUtils.adminRoute(req, res,
        authenticated=>{
            Toppings.delete(req.params.id, success=>{
                res.json("success");
            }, next);
    }, next);
});

module.exports = router;