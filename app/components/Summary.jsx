var React = require('react');

var Summary= React.createClass({
  componentDidMount: function(){
    $(document).foundation();
  },
  bedroomHandler: function(e){
    var that = this;
    e.preventDefault();
    $('#example-dropdown').foundation('toggle');
    ProductAccess.getProducts('AL694-BN').then(function(data){
      console.log(data);
      that.setState({
        data:data[0]
      });
    }, function(errorMessage){
      console.log(errorMessage);
    });
  },
  render: function(){
    var {runningTotal} = this.props;
    var laborTotal = runningTotal/10,
        grandTotal = runningTotal*1.1;
    return (
      <div className="row">
        <div className="column">
          <h1>Material Total $ {runningTotal.toFixed(2)}</h1>
          <h1>Labor Total $ {laborTotal.toFixed(2)}</h1>
          <h1>Grand Total $ {grandTotal.toFixed(2)}</h1>
          <div className="button">Generate Estimate</div>
        </div>
      </div>
    )
  }
})

module.exports = Summary;
