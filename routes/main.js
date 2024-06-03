var express = require('express');
var router = express.Router();
const studentModel  = require("./students");

// Advance JavaScript 
router.get('/stucreate', async function(req, res) {
    let studentdata = await studentModel.create({
      username: "harshiii",
      nickname: "ha",
      description: "He is a good developer",
      categories: ['docker', 'postman']
    });
    res.send(studentdata)
});

// Case Insensitive Search 
router.get('/stufind', async function(req, res) {
    var regex = new RegExp('^harsh$', 'i')
    let student = await studentModel.find({username: regex})
    res.send(student)
});

// Find documents where an array field contains all of a set of values 
router.get('/stufind1', async function(req, res) {
    let student = await studentModel.find({categories: {$all: ['js']}})
    res.send(student)
});

// Find data between specific date range 
router.get('/stufind2', async function(req, res) {
    var date1= new Date('2024-06-03')
    var date2= new Date('2024-06-04')
    let student = await studentModel.find({datecreated: {$gte: date1, $lte: date2}})
    res.send(student)
});

// filter document based on existing of a field 
router.get('/stufind3', async function(req, res) {
    let student = await studentModel.find({categories:{ $exists : true}})
    res.send(student)
});

// Filter documents based on a specific field's length 
router.get('/stufind4', async function(req, res) {
    let student = await studentModel.find({
        $expr:{
            $and:[
                {$gte: [{$strLenCP: '$nickname'}, 5]},
                {$lte: [{$strLenCP: '$nickname'}, 10]}
            ]
        }
    })
    res.send(student)
});

module.exports = router;