const fs=require("fs");
const express=require("express");
const app=express();
const path=require("path");
const port=80;
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/userinfo', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected");
});
const InfoSchema = new mongoose.Schema({
    Username: String,
    Password:String
  });
const Info = mongoose.model('Info', InfoSchema);

app.use("/",express.static('static'));
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,"views"));
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.status(200).render('pubgmainpage.pug');
});
app.get('/About',(req,res)=>{
    res.status(200).render('About.pug');
});
app.get('/Login',(req,res)=>{
    res.status(200).render('loginpage.pug');
});
app.get('/News',(req,res)=>{
    res.status(200).render('Newspage.pug');
});
app.get('/Supporteddevices',(req,res)=>{
    res.status(200).render('Supporteddevices.pug');
});
app.get('/knowmore',(req,res)=>{
    res.status(200).render('Updateinfo.pug');
});
app.get('/DeveloperContact',(req,res)=>{
    res.status(200).render('DeveloperContact.pug');
});
app.get('/createaccount',(req,res)=>{
    res.status(200).render('Createaccount.pug');
});
app.post('/Login',(req,res)=>{
    var mydata=new Info(req.body);
    mydata.save().then(()=>{
        res.send("Logged in Successfully");
    }).catch(()=>{
        res.status(400).send("Login error")
    })
})
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
});