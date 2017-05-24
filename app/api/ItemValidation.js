module.exports = {
  avoidStateDuplicates: (requestedModelNos,currentState)=>{
    return  requestedModelNos.filter((modelNo)=>{
      var keep = true;
      currentState.forEach((stateItem)=>{
        console.log(stateItem);
        if(stateItem.modelNo=== modelNo){
          keep = false
        }
      })
      return keep
    });
  },
  modelNosFromLocalStorage: (modelNos)=>{
    let local = JSON.parse(localStorage.getItem('Items'));
    console.log(local);
    if(local === null){
      return [];
    }
    return modelNos.filter((modelNo)=>{
      let lookup = false;
      local.forEach((localItem)=>{
        if(localItem.modelNo ===modelNo){
          lookup = true;
        }
      });
      return lookup
    });

    // return inLocalStorage.map((modelNo)=>{
    //         var returnedItem;
    //         local.forEach((localItem)=>{
    //           if(localItem.modelNo===modelNo){
    //             returnedItem = localItem
    //           }
    //         });
    //         return returnedItem
    //       })
  },
  getFromDatabase:(localStorageModelNos, allModelNos)=>{
    if(localStorageModelNos===null){
      localStorageModelNos = [];
    }
    return allModelNos.filter((modelNo)=>{
      if(localStorageModelNos.indexOf(modelNo)>-1){
        return false
      }
      return true
    })
  },

  addToLocalStorage: (products)=>{
    let local = JSON.parse(localStorage.getItem('Items'));
    if(local === null){
      local = [];
    }
    products.forEach((product)=>{
      var identified = false;
      local.forEach((localItem)=>{
        if(localItem.modelNo === product.modelNo){
          identified = true;
        }
      });
      if(!identified){
        local.push(product);
        console.log(`model no ${product.modelNo} has been added to localStorage`)
      }
    });
    localStorage.setItem('Items',JSON.stringify(local)); 
  }
}
