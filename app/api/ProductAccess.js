var axios = require('axios');


//
module.exports = {
  getModelNo: function(modelNo){
    var requestUrl = `/modelNo/${modelNo}`;
    console.log(requestUrl);

    return axios.get(requestUrl).then(function(res){
      return res.data;
    }, function(err){
      throw new Error('Product Data not Available');
    });
  },
  allProducts: function(){

    var requestUrl = "/allProducts";

    return axios.get(requestUrl).then(function(res){
      console.log(res);
      return res.data;
    }, function(err){
      throw new Error('Product Data not Available');
    });
  },
  getModelNoList: function (modelNos){
    var requestUrl = `/modelNos`;

    return axios({
  method: 'post',
  url: requestUrl,
  data: {
    modelNos:modelNos
  }
}).then(function(res){
      return res.data
    }, function(err){
      throw new Error('Product Data not Available');
    })
  }
}
