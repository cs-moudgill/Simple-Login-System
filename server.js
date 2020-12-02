var express = require("express");
var mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { stringify } = require("querystring");
var app = express();
app.use(express.static("public"));
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(
  `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.bcp5k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const loginSchema = mongoose.Schema({
  email: String,
  password: String,
});
const Login=mongoose.model("Login", loginSchema);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.get("/register", (req, res) => {
  res.sendFile(`${__dirname}/register.html`);
});
app.get("/signin", (req, res) => {
    res.sendFile(`${__dirname}/signin.html`);
  });
  app.get("/signinfailure", (req, res) => {
    res.sendFile(`${__dirname}/signinfailure.html`);
  });

app.post("/register", (req, res) => {
const data=new Login({
    email:req.body.email,
    password:req.body.password
});
data.save().then(()=>{
    console.log('Data submitted to DB');
})
  res.redirect("/register");
});

app.post("/signin", (req, res) => {
Login.findOne({email:req.body.email,password:req.body.password},(err,response)=>{
  if(response){
    res.redirect('/signin')
  }else{
    res.redirect('/signinfailure')
  }
})
});

app.listen(3000, () => {
  console.log("Connected on 3000 Port");
});
