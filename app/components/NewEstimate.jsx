var React = require('react');
var ProductAccess = require('ProductAccess');
var Summary = require('Summary');
var templateConfig = require('templateConfig');
var Item = require('Item');
var AllMaterials = require('AllMaterials');
var ItemValidation = require('ItemValidation');


var NewEstimate= React.createClass({
  getInitialState: function(){
    return {
      data:[],
      materialTotals: [],
      runningTotal:0,
      display: 'cart'
    }
  },
  componentDidMount: function(){
    $(document).foundation();
    console.log(`mounted`);
  },
  handleAllMaterials: function(){
    this.setState({
      display:'AllMaterials'
    })
  },
  handleReturnClick: function(modelNos){
    var filteredModelNos = ItemValidation.avoidStateDuplicates(modelNos,this.state.data);
    var localModelNos = ItemValidation.modelNosFromLocalStorage(filteredModelNos);
    var dbModelNos = ItemValidation.getFromDatabase(localModelNos,filteredModelNos);
    console.log(dbModelNos.length);
    var localItems = ProductAccess.getProductsFromLocalStorage(localModelNos);

    ProductAccess.getModelNoList(dbModelNos).then((data)=>{
      ItemValidation.addToLocalStorage(data);
      this.setState({
        data:[
        ...this.state.data,
        ...data,
        ...localItems
        ]
      })
    });
    this.setState({
      display:'cart'
    })
  },
  bedroomHandler: function(e){
    this.setState({
      data:[],
      materialTotals: [],
      runningTotal:0
    });
    e.preventDefault();
    $('#example-dropdown').foundation('toggle');
    var starters = templateConfig.bedroom;
    var filteredModelNos = ItemValidation.avoidStateDuplicates(starters,this.state.data);
    var localModelNos = ItemValidation.modelNosFromLocalStorage(filteredModelNos);
    var dbModelNos = ItemValidation.getFromDatabase(localModelNos,filteredModelNos);
    console.log(dbModelNos.length);
    var localItems = ProductAccess.getProductsFromLocalStorage(localModelNos);
    
    ProductAccess.getModelNoList(dbModelNos).then((data)=>{
      ItemValidation.addToLocalStorage(data);
      this.setState({
        data:[
        ...this.state.data,
        ...data,
        ...localItems
        ]
      })
    });
    this.setState({
      display:'cart'
    })
  
  },
    bathroomHandler: function(e){
    this.setState({
      data:[],
      materialTotals: [],
      runningTotal:0
    });
    e.preventDefault();
    $('#example-dropdown').foundation('toggle');
    var starters = templateConfig.bathroom;
    var filteredModelNos = ItemValidation.avoidStateDuplicates(starters,this.state.data);
    var localModelNos = ItemValidation.modelNosFromLocalStorage(filteredModelNos);
    var dbModelNos = ItemValidation.getFromDatabase(localModelNos,filteredModelNos);
    console.log(dbModelNos.length);
    var localItems = ProductAccess.getProductsFromLocalStorage(localModelNos);
    
    ProductAccess.getModelNoList(dbModelNos).then((data)=>{
      ItemValidation.addToLocalStorage(data);
      this.setState({
        data:[
        ...this.state.data,
        ...data,
        ...localItems
        ]
      })
    });
    this.setState({
      display:'cart'
    })
  },
  handleChange: function(qty,price,total,item){
    console.log("changed");
    var materialTotals = this.state.materialTotals;
    var identifiedMaterial = materialTotals.length;
    materialTotals.forEach((material,i)=>{
      if(material.item === item){
        identifiedMaterial = i;
      }
    })
    materialTotals[identifiedMaterial]={
      item,
      qty,
      price,
      total
    };
    var runningTotal = 0;

    materialTotals.forEach((material)=>{
      runningTotal += material.total;
    })

    console.log("uh",runningTotal);
    this.setState({
      materialTotals,
      runningTotal
    })
  },

  render: function(){

    var {runningTotal,display} = this.state;

        var renderItems = ()=>{
          var currentItems = this.state.data;
          if(currentItems.length > 0){
            return currentItems.map((item) => {
              if(item){
                return (
                  <Item key={item._id} {...item} onChange={this.handleChange}/>
                )
              }
            });
          } else {
            return (
              <div className="container center-align">Cart Empty!</div>
            )
          }
    
        };
        var renderAdditionalItems = ()=>{
          if(display==='cart'){
            return <button className="button" type="button" onClick={this.handleAllMaterials}>Add Other Materials!</button>
          } else if(display==='AllMaterials'){
            return <AllMaterials onReturnClick={this.handleReturnClick}/>
          }
        }
    
        return (
        <div>
          <div className="row">
            <div className="small-3 text-align center column float-left">
              <button className="button" type="button" data-toggle="example-dropdown">Templates</button>
              <div className="dropdown-pane small-6" id="example-dropdown" data-dropdown data-auto-focus="true">
                <a className="button small-12" onClick={this.bedroomHandler}>Bedroom</a>
                <a className="button small-12" onClick={this.bathroomHandler} >Bathroom</a>
                <a className="button small-12">Livingroom</a>
                <a className="button small-12">Patio</a>
              </div>
            </div>
            <div className="small-9 float-left">
              <div className="row" data-equalizer>
              {renderItems()}
              </div>
            </div>
          </div>
          {renderAdditionalItems()}
          <Summary runningTotal={runningTotal}/>
        </div>
        )

  }
})

module.exports = NewEstimate;
