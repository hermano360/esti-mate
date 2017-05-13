var React = require('react');
var ProductAccess = require('ProductAccess')


var NewEstimate= React.createClass({
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
    return (
      <div className="row">
        <div className="small-3 text-align center column">
          <button className="button" type="button" data-toggle="example-dropdown">Templates</button>
          <div className="dropdown-pane small-6" id="example-dropdown" data-dropdown data-auto-focus="true">
            <a className="button small-12" onClick={this.bedroomHandler}>Bedroom</a>
            <a className="button small-12">Bathroom</a>
            <a className="button small-12">Livingroom</a>
            <a className="button small-12">Patio</a>
          </div>
        </div>
        <div className=" small-9 text-align center column">
          <a className="hollow button small-4" href="#/newestimate">Create New Estimate</a>
          <a className="hollow button small-4" href="#/newestimate">Create New Estimate</a>
          <a className="hollow button small-4" href="#/newestimate">Create New Estimate</a>
          <a className="hollow button small-4" href="#/newestimate">Create New Estimate</a>
          <a className="hollow button small-4" href="#/newestimate">Create New Estimate</a>
          <a className="hollow button small-4" href="#/newestimate">Create New Estimate</a>
          <a className="hollow button small-4" href="#/newestimate">Create New Estimate</a>
          <a className="hollow button small-4" href="#/newestimate">Create New Estimate</a>
          <a className="hollow button small-4" href="#/newestimate">Create New Estimate</a>
        </div>
      </div>
    )
  }
})

module.exports = NewEstimate;
