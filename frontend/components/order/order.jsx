import React from "react";

export default props =>(
    <div className= "order-component">
        
    </div>
);

export default class Order extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.state = {
            sizes: [],
            toppings: [],
            selectedSize: null,
            selectedToppings: []
        };
        this.props.getSizes();
        this.props.getToppings();
    }
    sortSizes(sizes){
        Object.keys(sizes).map(id=>sizes[id]).sort((sizeA, sizeB)=>
            (sizeA.price < sizeB.price)? -1 : 1 
        );
    }
    handleSizeSelect(e){
        e.stopPropagation();
        this.setState({selectedSize: e.target.value});
    }
    sortToppings(toppings){
        Object.keys(toppings).map(id=>toppings[id]).sort((toppingA, toppingB)=>
            (toppingA.name < toppingB.name)? -1 : 1
        );
    }

    componentWillReceiveProps(newProps){
        this.setState({
            sizes: this.sortSizes(newProps.sizes),
            toppings: this.sortToppings(newProps.toppings)        
        });
    }
    
    render(){

        return(
            <div className= "order-component">
                <form className="pizza-customization-form">
                    <select name="size">
                        {this.state.sizes.forEach((size, idx)=>
                            <option key={`sizeSelect${idx}`} {(this.state.selectedSize === size.id ? "selected": "")}
                             name={size.name} value={size.id}>
                                {size.name}
                            </option>
                        )}
                    </select>
                </form>    
            </div>
        );
    }
}