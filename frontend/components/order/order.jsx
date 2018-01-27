import React from "react";
import {formatPrice} from "Utils/string";

export default class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sizes: [],
            toppings: [],
            selectedSize: null,
            selectedToppings: []
        };
        this.handleSizeSelect = this.handleSizeSelect.bind(this);
    }

    componentWillMount(){
        this.props.getSizes();
        this.props.getToppings();
    }
    sortSizes(sizes){
        return Object.keys(sizes).map(id=>sizes[id]).sort((sizeA, sizeB)=>
            (sizeA.price < sizeB.price)? -1 : 1 
        );
    }
    handleSizeSelect(e){
        e.stopPropagation();
        this.setState({selectedSize: e.target.value});
    }
    sortToppings(toppings){
        return Object.keys(toppings).map(id=>toppings[id]).sort((toppingA, toppingB)=>
            (toppingA.name < toppingB.name)? -1 : 1
        );
    }

    componentWillReceiveProps(newProps){
        this.setState({
            sizes: this.sortSizes(newProps.sizes),
            toppings: this.sortToppings(newProps.toppings)        
        });
    }
    
    formattedSizePrice(){
        return formatPrice(this.props.sizes[this.state.selectedSize].price);
    }

    generateSizeSelect(){
        return <select name="size" value={this.state.selectedSize || ""} onChange={this.handleSizeSelect}>
            {this.state.sizes.map((size, idx)=>
                <option key={`sizeSelect${idx}`}
                    name={size.name} value={size.id}>
                    {size.name}
                </option>
            )}      
        </select>
    }

    render(){
        return(
            <div className= "order-component">
                <form className="pizza-customization-form">
                    <div className="pizza-customization-form_group"> 
                        <label htmlFor="size">size</label>
                        {this.generateSizeSelect()}
                        <a>{this.state.selectedSize? this.formattedSizePrice() : ""}</a>
                    </div>
                </form>    
            </div>
        );
    }
}