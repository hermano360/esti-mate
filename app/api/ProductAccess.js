var axios = require('axios');


//
module.exports = {
  getProducts: function(modelNo){
    var requestUrl = `/modelNo/${modelNo}`;
    console.log(requestUrl);

    return axios.get(requestUrl).then(function(res){
      if(res.data.cod && res.data.message){
        throw new Error(res);
      } else {
        return res.data;
      }
    }, function(err){
      throw new Error('Product Data not Available');
    });
  }
}
