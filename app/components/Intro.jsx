var React = require('react');

var Intro= React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="small-12 text-align center column small-centered">
          <h1>Welcome to Ez-Estimator</h1>
        </div>
        <div className=" text-align center column small-centered">
          <a className="hollow button small-offset-2 small-4" href="#/newestimate">Create New Estimate</a>
          <button className="hollow button small-4" href="#">Review Previous Estimate?</button>
        </div>
      </div>
    )
  }
})

module.exports = Intro;
