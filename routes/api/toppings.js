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
        toppings.forEach(topping=>{
            index[topping.id] = Toppings.renderTopping(topping);
        });
        res.json(index);
    }, next);
});

router.put("/", function(req, res, next){
    AdminUtils.adminRoute(req, res,
        authenticated=>{
            const queries = Object.keys(req.body).map(key=>req.body[key]);
            let composed = (query=>()=> Toppings.update(query, success=>{
                res.json("success");
            }, next))(queries.pop());
            let query;
            while(queries.length > 0){
                query = queries.pop();
                composed = ((chain, query)=>
                    ()=> Toppings.update(query, success=>{
                        chain();
                    }, next)
                )(composed, query);
            }
            composed();
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