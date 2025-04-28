const express =require('express');
const Joi =require('joi')
const route=express.Router();
const mysql=require('../mysql')



route.get('/device',(req,res)=>{
    var query="SELECT * from device_info ";
    var id=req.params.id;

    mysql.exec(query,[id],function(err,result){
        if(err)
            return res.status(404).json(err);
        if(result.length==0){
            return res.status(404).send("data not found");
        }
        return res.json(result);
    })
});


route.get('/:id',(req,res)=>{
   
    var query="SELECT * from device_info WHERE id=?";
    var id=req.params.id;

    mysql.exec(query,[id],function(err,result){
        if(err)
            return res.status(404).json(err);
        if(result.length==0){
            return res.status(404).send("data not found");
        }
        return res.json(result);
    })
});



// route.post('/', (req, res) => {
//     const { error } = validatedevice(req.body);
//     if (error) {
//         return res.status(404).send(error.details[0].message); // ✅ Return to prevent further execution
//     }

//     var values = req.body;
//     var query = "INSERT INTO device_info SET ?";
    
//     mysql.exec(query, values, function (err, data) {
//         if (err) { 
//             return res.status(404).send('error'); // ✅ Return to stop execution
//         }

//         if (data.affectedRows < 1) {
//             return res.status(404).send('error'); // ✅ Return to prevent multiple sends
//         }

//         return res.json({
//             id: data.insertId
//         });
//     });
// });


route.post('/', (req, res) => {
    const { error } = validatedevice(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message); // 400 = Bad Request
    }

    const values = req.body;
    const query = "INSERT INTO device_info SET ?";

    mysql.exec(query, values, function (err, data) {
        if (err) { 
            console.error("MySQL Error:", err);
            return res.status(500).send('Database error'); // 500 = Server Error
        }

        if (data.affectedRows < 1) {
            return res.status(500).send('Insert failed'); // Could also use 400
        }

        return res.json({
            id: data.insertId
        });
    });
});



route.put('/:id',(req,res)=>{
       
    const { error } = validatedevice(req.body);// Object Destructor 

    if (error) {
        res.status(404).send(error.details[0].message);
    }
    var id = req.params.id;
    var values = req.body;
    var query = "UPDATE device_info SET ? WHERE id = ? ";

    // Return Query Status
    mysql.exec(query, [values, id], function (err, data) {
        if (err) { if (err) return res.status(404).send('error'); };
        if (data.affectedRows < 1) {
            return res.status(404).send('error');
        }
        res.json({ success: "Data" });
    });
});


function validatedevice(device) {
    const schema = Joi.object({
        id: Joi.number().integer().required(), // Auto-incremented
        devicename: Joi.string().max(100).required(),

        mac_address: Joi.string()
            .pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)
            .required(),

        device_type: Joi.string().max(30).required(),
        make: Joi.string().max(50).required(),
        model: Joi.string().max(50).required(),
        os: Joi.string().max(50).required(),

        serial_number: Joi.string().max(100).optional(),

        status: Joi.string().valid('up', 'down').required(),

        organation_serial_no: Joi.string().required(),

        snmp_enabled: Joi.string().valid('0', '1').required(),
        snmp_version: Joi.string().valid('1', '2c', '3').required(),
        snmp_community: Joi.string().max(50).when('snmp_enabled', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.allow('').optional()
        }),

        sys_descr: Joi.string().required(),
        sys_name: Joi.string().max(100).required(),

        is_monitored: Joi.string().valid('0', '1').required(),

        added_on: Joi.date().iso().required(),
        purchase_date: Joi.date().iso().required(),
        fist_installation_date: Joi.date().iso().required(),
        delete_flag: Joi.string().valid('Y', 'N')
    });

    return schema.validate(device);
}

module.exports =route;

