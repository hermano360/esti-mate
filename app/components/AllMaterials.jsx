var React = require('react');
var ProductAccess = require('ProductAccess');

var AllMaterials= React.createClass({
	getInitialState: function(){
    	return {
    		categories:[],
    		products:[]
    	}
  	},
	componentDidMount: function(){
		var that = this;
		let newCategories = []
		ProductAccess.allProducts().then(function(data){
			data.forEach((product)=>{
				if(that.state.categories.indexOf(product.category)===-1){
					newCategories.push(product.category)
				}
			})
			that.setState({
				products: [
				...that.state.products,
				...data
				],
				categories: newCategories
			});
      }, function(errorMessage){
        console.log(errorMessage);
      });

	},

	render: function(){
		return (
			<h1>All Materials</h1>
		)
	}
})

module.exports = AllMaterials;
