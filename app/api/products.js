MongoClient = require('mongodb').MongoClient;
assert = require('assert');
module.exports = {

  getModelNo : function(modelNo,callback){
    console.log(modelNo,"products");
    var dbLink = 'mongodb://'+'hermano360'+':'+'f00tball'+'@'+'ds137090.mlab.com:37090/meadowlark';
    var query = {};
    if(modelNo !== 'all'){
      query = {
        modelNo:modelNo
      }
    }
    MongoClient.connect(dbLink, function(err, db) {
      console.log("Successfully connected to database");
      console.log(query);
      db.collection('products').find(query).toArray(function(err, docs) {
        console.log(docs);
        callback(docs);
        db.close();
      });
    });
  },
    allProducts : function(callback){
    console.log("products");
    var dbLink = 'mongodb://'+'hermano360'+':'+'f00tball'+'@'+'ds137090.mlab.com:37090/meadowlark';
    MongoClient.connect(dbLink, function(err, db) {
      console.log("Successfully connected to database");
      db.collection('products').find({}).toArray(function(err, docs) {
        console.log(docs);
        callback(docs);
        db.close();
      });
    });
  }

}
