const express = require('express');
const router = express.Router();
const db = require("../../db");
const SqlString = require('sqlstring');

router.get('/:id', function(req, res, next) {
    db.get().query(
        SqlString.format('SELECT * FROM users WHERE id = ?', [req.params.id]),
        (error, results, fields) => {
            debugger;
        }
    );
});
  
module.exports = router;