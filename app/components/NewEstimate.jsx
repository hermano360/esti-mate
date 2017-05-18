var React = require('react');
var ProductAccess = require('ProductAccess');
var Summary = require('Summary');
var templateConfig = require('templateConfig');
var Item = require('Item');


var NewEstimate= React.createClass({
  getInitialState: function(){
    return {
      data:[],
      materialTotals: [],
      runningTotal:0
    }
  },
  componentDidMount: function(){
    $(document).foundation();
  },
  bedroomHandler: function(e){
    var that = this;
    this.setState({
      data:[]
    });
    e.preventDefault();
    $('#example-dropdown').foundation('toggle');
    var starters = templateConfig.bedroom;
    console.log(starters);
    starters.forEach((modelNo)=>{
      console.log(that);
      ProductAccess.getProducts(modelNo).then(function(data){
        that.setState({
          data:[
            ...that.state.data,
            data[0]
          ]
        });
      }, function(errorMessage){
        console.log(errorMessage);
      });
    })
  },
    bathroomHandler: function(e){
    var that = this;
    this.setState({
      data:[]
    });
    e.preventDefault();
    $('#example-dropdown').foundation('toggle');
    var starters = templateConfig.bathroom;
    console.log(starters);
    starters.forEach((modelNo)=>{
      console.log(that);
      ProductAccess.getProducts(modelNo).then(function(data){
        that.setState({
          data:[
            ...that.state.data,
            data[0]
          ]
        });
      }, function(errorMessage){
        console.log(errorMessage);
      });
    })
  },
  handleChange: function(qty,price,total,item){
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
    var {runningTotal} = this.state;
    var renderItems = ()=>{
      var currentItems = this.state.data;
      if(currentItems.length > 0){
        return currentItems.map((item) => {
          return (
            <Item key={item._id} {...item} onChange={this.handleChange}/>
          )
        });
      } else {
        return (
          <div className="container center-align">Please Enter Items</div>
        )
      }
    };

    return (
    <div>
      <div className="row">
        <div className="small-3 text-align center column">
          <button className="button" type="button" data-toggle="example-dropdown">Templates</button>
          <div className="dropdown-pane small-6" id="example-dropdown" data-dropdown data-auto-focus="true">
            <a className="button small-12" onClick={this.bedroomHandler}>Bedroom</a>
            <a className="button small-12" onClick={this.bathroomHandler} >Bathroom</a>
            <a className="button small-12">Livingroom</a>
            <a className="button small-12">Patio</a>
          </div>
        </div>
        <div className=" small-9 text-align center column">
          {renderItems()}
        </div>
      </div>
      <Summary runningTotal={runningTotal}/>
      </div>
    )
  }
})

module.exports = NewEstimate;
