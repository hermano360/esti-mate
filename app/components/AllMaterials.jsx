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
		
		let newCategories = []
		ProductAccess.allProducts().then((data)=>{
			data.forEach((product)=>{
				if(newCategories.indexOf(product.category)===-1){
					newCategories.push(product.category)
				}
			})
			this.setState({
				products: [
				...this.state.products,
				...data
				],
				categories: newCategories
			});
      }, function(errorMessage){
        console.log(errorMessage);
      });

	},

	render: function(){
		var {categories,products} = this.state;
		return (
			<h1>All Materials</h1>
		)
	}
})

module.exports = AllMaterials;
