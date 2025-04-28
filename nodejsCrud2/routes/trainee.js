const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');



router.get('/allcourse/', (req, res) => {

    var query = "SELECT * FROM courses ";
    var id = req.params.id;

    mysql.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("trainee Not Found");
        }
        return res.json(result);
    });

});

router.get('/', (req, res) => {

    var query = "SELECT * FROM traineedetails ";
    //var query = "";
    var id = req.params.id;

    mysql.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("trainee Not Found");
        }
        return res.json(result);
    });

});

router.get('/getTable', (req, res) => {

    var query = `SELECT 
    t.id , 
    t.name, 
    t.dob, 
    c.id AS course_id, 
    c.name AS course_name
FROM 
    traineedetails t
JOIN 
    courses c ON t.c_id = c.id; `;
    //var query = "";
    var id = req.params.id;

    mysql.exec(query, [id], function (err, result) {
        if (err) return res.status(404).json(err);
        if (result.length == 0) {
            return res.status(404).send("trainee Not Found");
        }
        return res.json(result);
    });

});




router.post('/', (req, res) => {
    const { error } = validatetrainee(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
    }
    var values = req.body;
    var query = "INSERT INTO traineedetails SET ? ";
    mysql.exec(query, values, function (err, data) {
        if (err) { if (err) res.status(404).send('error'); return; };

        if (data.affectedRows < 1) {
            res.status(404).send('error'); return;
        }
        res.json({
            id: data.insertId

        });
    });

});



router.put('/:id', (req, res) => {


    //Validate trainee

    const { error } = validatetrainee(req.body);// Object Destructor 

    if (error) {
        res.status(404).send(error.details[0].message);
    }
    var id = req.params.id;
    var values = req.body;
    var query = "UPDATE traineedetails SET ? WHERE id = ? ";

    // Return Query Status
    mysql.exec(query, [values, id], function (err, data) {
        if (err) { if (err) return res.status(404).send('error'); };
        if (data.affectedRows < 1) {
            return res.status(404).send('error');
        }
        res.json({ success: "Data" });
    });

});



router.delete('/:id', (req, res) => {

    var id = req.params.id;
    var query = "DELETE FROM traineedetails WHERE id = ?";
    mysql.exec(query, [id], function (err, data) {
        if (err) { if (err) res.status(404).send('error'); return; };
        if (data.affectedRows < 1) {

            res.status(404).send('error'); return;
        }
        res.json({ success: true });
    });

});


function validatetrainee(trainee) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        dob: Joi.date().iso().required(),
        c_id: Joi.number().required()

    });
    return schema.validate(trainee);

}



module.exports = router;