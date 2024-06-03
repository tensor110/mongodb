var express = require('express');
var router = express.Router();
const userModel  = require("./users");
const studentModel  = require("./students");
const { Cookie } = require('express-session');

router.get('/', function(req, res) {
  res.render("index");
});

// Create 
router.get('/create', async function(req, res) {
  const createdUser = await userModel.create({
    username: "maheswar1100",
    name: "Maheswar2",
    age: 24,
  });
  res.send(createdUser)
});

// Find 
router.get('/find', async function(req, res) {
  let allUsers = await userModel.find()
  res.send(allUsers)
});

// FindOne 
router.get('/findone', async function(req, res) {
  let allUsers = await userModel.findOne({username: 'maheswar110'})
  res.send(allUsers)
});

// FindOne and Delete
router.get('/delete', async function(req, res) {
  let deletedUser = await userModel.findOneAndDelete({username: 'maheswar110'})
  res.send(deletedUser)
});

//Session -> Install express-session
// Session Create 
router.get('/session', function(req, res) {
  req.session.ban = true;
  res.render('index')
});
// Session Read
router.get('/checkban', function(req, res) {
  if(req.session.ban === true){
    res.send("You are banned")
  }
  else{
    res.send("Not banned")
  }
});
// Session Destroy 
router.get('/removeban', function(req, res) {
  req.session.destroy(function(err){
    if(err) throw err;
    res.send("Ban removed")
  })
});

// Cookie -> Install cookie-parser
// Create Cookie 
router.get('/cookie', function(req, res) {
  res.cookie("ages", 25)
  res.render('index')
});
// Read Cookie 
router.get('/readcookie', function(req, res) {
  console.log(req.cookies.age)
  res.render('Cookie Checked')
});
// Delete Cookie 
router.get('/deletecookie', function(req, res) {
  res.clearCookie("age")
  res.render('Cookie Destroyed')
});



// Flash Message 
router.get('/flash', function(req, res) {
  req.flash("age", 21)
  req.flash("name", "mahes")
  res.send("Flash Message sent")
});
router.get('/checkflash', function(req, res) {
  console.log(req.flash("age"), req.flash("name"))
  res.send("Flash Message Checked")
});

module.exports = router;
