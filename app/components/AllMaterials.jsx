var React = require('react');
var ProductAccess = require('ProductAccess');
const uuidV1 = require('uuid/v1');

var AllMaterials= React.createClass({
	getInitialState: function(){
    	return {
    		categories:[],
    		products:[]
    	}
  	},
	componentDidMount: function(){
		
		let newCategories = [];
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
	onReturnClick: function(){
		var collectedModelNos = [];
		for(var item in this.refs){
			if(this.refs[item].checked){
				collectedModelNos.push(item)
			}
		}
		var uniqueModelNos = collectedModelNos.filter((modelNo)=>{
			var keep = true;
			this.props.currentItems.forEach((cartItem)=>{
				console.log(cartItem.modelNo,modelNo)
				if(modelNo === cartItem.modelNo){
					console.log(modelNo);
					keep = false;
				}
			})
			return keep
		});

		this.props.onReturnClick(uniqueModelNos);
	},

	render: function(){
		var {categories,products} = this.state;

		var renderCategoryItems=(category)=>{
			var viableProducts = products.filter((product)=>{return product.category === category});
			return viableProducts.map((product)=>{
				return <h1 key={product.description}>{product.description}</h1>
			});
		}
		var testRenderCategoryItems=(category)=>{
			var viableProducts = products.filter((product)=>{return product.category === category});
			return viableProducts
		}

		var renderCategories = ()=>{
			console.log("renderCategories");

			return categories.map((category)=>{
				var categoryTitle = [<h1 key={category}>{category}</h1>];
				renderCategoryItems(category).forEach((productItem)=>{
					categoryTitle.push(productItem)
				});
			});
        };
        var testRenderCategories = ()=>{
        	var final = categories.map((category)=>{
        		var categoryTitle= [category];
        		testRenderCategoryItems(category).forEach((product)=>{
        			categoryTitle.push(product);
        		});
        		return categoryTitle;
        	})

        	var flattenedFinal = [];
        	final.forEach((section)=>{
        		section.forEach((item)=> flattenedFinal.push(item))
        	});

        	return flattenedFinal.map((item)=>{
        		
        		if(typeof item === 'string'){
        			return 	<label className="small-12" key={item}>{item}</label>
        		} else {
        			return (<div key={item.modelNo}><input className="small-2" id="checkbox1" type="checkbox" ref={item.modelNo}/><label className="small-6" htmlFor={item.modelNo}>{item.description}</label></div>)
        		}
        	})
        }


		return (
			<div>
				<form>
					<div className="row text-align center">
						<div className="columns" >
							{testRenderCategories()}
						</div>
					</div>
				</form>
				<button className="button" onClick={this.onReturnClick}>Add to Cart and Return</button>
			</div>
		)
	}
})

module.exports = AllMaterials;
