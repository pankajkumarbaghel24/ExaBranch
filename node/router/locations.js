const mysql=require("../mysql");
const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
//const Joi = require('joi');

router.get('/', (req, res) => {
    // var id = req.params.id;
    var query = "SELECT * FROM locations";
    //var query = "";
    mysql.execute(query).then((result)=>{
        console.log(result);
        return res.json(result[0]);
    }).catch((error)=>{
        return res.status(404).send("Device Information Not Found");
    });
});

module.exports = router;