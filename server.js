var express = require('express');
var products = require('./app/api/products.js');

//Create out app

var app = express();
const PORT = process.env.PORT || 3000;

//making sure traffic is through http, if not converting to http because
// openWeatherMap doesn't work with https
app.use(function(req,res,next){
  if(req.headers['x-forwarded-proto']==='https'){
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
})
app.use(express.static('public'));

app.get('/modelNo/:modelNo', function(req,res,next){
  products.getModelNo(req.params.modelNo,function(docs){
    res.json(docs)
  });
});

app.get('/allProducts', function(req,res,next){
  products.allProducts(function(docs){
    res.json(docs)
  });
});

app.listen(PORT,function(){
  console.log('Express server is up on port ' + PORT);
});
