const mysql=require("../mysql2");
const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');


router.get('/', (req, res) => {
    // var id = req.params.id;
    var query = "SELECT * FROM gender";
    //var query = "";
    mysql.execute(query).then((result)=>{
        console.log(result);
        return res.json(result[0]);
    }).catch((error)=>{
        return res.status(404).send("Gender Not Found");
    });

    // mysql.exec(query, [id], function (err, result) {
    //     if (err) return res.status(404).json(err);
    //     if (result.length == 0) {
    //         return res.status(404).send("Course Not Found");
    //     }
    //     return res.json(result);
    // });

});



module.exports = router;