var express = require("express");
var bodyParser = require("body-parser");

var mysql = require("mysql");
var app = express();

 var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: false
}))
// Set Handlebars.
var exphbs = require("express-handlebars");
 app.engine("handlebars", exphbs({defaultLayout: "main"}));
 app.set("view engine", "handlebars");



 var connection = mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"sql2018",
     database:"burgers_db"
 })

 connection.connect(function(err){
     if(err)throw err;
     console.log("connected as id: " + connection.threadId);
 })

 app.get('/',function(req,res){
     connection.query('SELECT * burgers:', function(err,data){
         res.render('index',{burgers:data});
     })
 })
 app.post('/create', function(req,res){
     connection.query('INSERT INTO burgers (burger_name) VALUES (?);',[req.body.burger_name
    ], function(err,result){
        if(err)throw err;
        res.redirect('/');
    })
 })
 app.put('/update',function(req,res){
     connection.query('UPDATE burgers SET burger_name = ? WHERE id = ?', [req.body.
    burger, req.body.id],function(err,results){
        if(err)throw err;
        res.redirect('/');
    })
 })
 app.delete('/delete',function(req,res){
     connection.query("DELETE FROM burgers WHERE id = ?;",[req.body.id],function
        (err,results){
            if(err)throw err;
            res.redirect('/');
    })
 }) 
 // Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost: " + PORT);
  });
  
