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
        }).catch(function (error) {
          return []
    console.log(error);
  })
      }
  ,
    getProductsFromLocalStorage: function (modelNos){
      let local = JSON.parse(localStorage.getItem('Items'));
      return modelNos.map((modelNo)=>{
        var returnedItem;
        local.forEach((localItem)=>{
          if(localItem.modelNo === modelNo){
            returnedItem = localItem;
          }
        });
        return returnedItem;
      })
}
}
