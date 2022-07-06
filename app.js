//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
var items = [];
var work_items = [];
app.set('view engine','ejs');
app.get("/",function(req,res){
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("hi-IN",options);
  res.render("list",{listItems:day,newlistitems:items});
});

app.post("/",function(req,res){
  var item = req.body.newItem;

  if(req.body.list === "work"){
    work_items.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req,res){
  res.render("list",{listItems:"work list",newlistitems:work_items});

});


app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
});
