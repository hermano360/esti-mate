var React = require('react');

var Item= React.createClass({
  handleChange(){
  	
  	var qty,price;
  	if(this.refs.qty.value===''){
      qty='0'
    } else {
    	qty=this.refs.qty.value
    }
    price = this.props.price.replace(/\$(.*)/,'$1');
    var total = parseInt(qty)*parseFloat(price);
    console.log(qty,price,total,this.props.modelNo);
  	this.props.onChange(qty,price,total,this.props.modelNo);
  },

  render: function(){
    var {photo,price,modelNo,refURL,description,category}=this.props;
    return (
      <div className="container">
          <a href={refURL}>
              <img src={photo}></img>
              <h3>{description}</h3>
              <p>
                Model Number: {modelNo}<br/>
                Price: {price}<br/>
              </p>
          </a>
        Quantity: <input type="text" ref="qty" onChange={this.handleChange} defaultValue="0"/>
      </div>
    )
  }
})

module.exports = Item;
