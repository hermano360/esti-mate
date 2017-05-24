var React = require('react');
var ProductAccess = require('ProductAccess');
var Summary = require('Summary');
var templateConfig = require('templateConfig');
var Item = require('Item');
var AllMaterials = require('AllMaterials');


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
  checkLocalStorage(modelNo){
    var currentState = this.state.data;
    console.log(this.state.data);
    var inCurrentState = false
    currentState.forEach((currentItem)=>{
      console.log(this.state.data);
      if(currentItem.modelNo === modelNo){
        inCurrentState = true;
      }
    });

    if(!inCurrentState){
      var local = JSON.parse(localStorage.getItem('Items'));
      console.log(this.state.data);
      var inLocalStorage = false;
      var localStorageIndex;
      if(local=== null){
        local = [];
      }
      local.forEach((localItem,index)=>{
        console.log(this.state.data);
        if(localItem.modelNo===modelNo){
          inLocalStorage = true;
          localStorageIndex = index;
        }
      });
      if(inLocalStorage){
        console.log(this.state.data);
        currentState.push(local[localStorageIndex]);
        this.setState({
          data: currentState
        });
      } else {
      ProductAccess.getModelNo(modelNo).then((data)=>{
        console.log(this.state.data);
        // adding next line because of asyncronosity
        local = JSON.parse(localStorage.getItem('Items'));
        if(local === null){
          local=[];
        }
        local.push(data[0]);
        localStorage.setItem('Items',JSON.stringify(local));
        currentState.push(data[0])
        this.setState({
          data:currentState
        });
      }, function(errorMessage){
        console.log(errorMessage);
      }); 

      }

    }

  },
  handleReturnClick: function(modelNos){
    var that = this;
    modelNos.forEach((modelNo)=>{

      that.checkLocalStorage(modelNo);
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
    var that = this;
    debugger
    e.preventDefault();
    $('#example-dropdown').foundation('toggle');
    var starters = templateConfig.bedroom;
    starters.forEach((modelNo)=>{
      that.checkLocalStorage(modelNo);
    });
  },
  bathroomHandler: function(e){
    this.setState({
      data:[],
      materialTotals: [],
      runningTotal:0
    });
    var that = this;
    debugger
    e.preventDefault();
    $('#example-dropdown').foundation('toggle');
    var starters = templateConfig.bathroom;
    console.log(starters);
    starters.forEach((modelNo)=>{
      that.checkLocalStorage(modelNo);
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

    this.setState({
      materialTotals,
      runningTotal
    })
  },

  render: function(){

    var {runningTotal,display} = this.state;

    var renderItems = ()=>{
      var currentItems = this.state.data;
      console.log(this.state.data);
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
        return <AllMaterials onReturnClick={this.handleReturnClick} currentItems={this.state.data}/>
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
      <div className="small-9 float-left column">
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
