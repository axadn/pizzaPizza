import React from "react";
import {formatPrice} from "Utils/string";

export default class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sizes: [],
            toppings: [],
            selectedSize: null,
            selectedToppings: {}
        };
        this.handleSizeSelect = this.handleSizeSelect.bind(this);
        this.handleToppingSelect = this.handleToppingSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleToppingSelect(e){
        e.stopPropagation();
        const selectedToppings = this.state.selectedToppings;
        if(e.target.checked){
            selectedToppings[e.target.value] = true;
        }
        else{
            delete selectedToppings[e.target.value];
        }
        this.setState({selectedToppings});
    }
    handleSubmit(e){
        this.props.addToCart({size: this.state.selectedSize, toppings: this.state.selectedToppings});
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
        return(
            <fieldSet className="size-select-fieldSet">
                <legend>Choose a size</legend>
                <select name="size" value={this.state.selectedSize ||""} onChange={this.handleSizeSelect}>
                    <option value="" disabled hidden>Please Choose...</option>
                    {this.state.sizes.map((size, idx)=>
                        <option key={`sizeSelect${idx}`}
                            name={size.name} value={size.id}>
                            {size.name}
                        </option>
                    )}      
                </select>
                <a>{this.state.selectedSize? this.formattedSizePrice() : ""}</a>
            </fieldSet>
        );
    }

    renderCheckout(){
        if(this.state.selectedSize){
            let total = this.props.sizes[this.state.selectedSize].price;
            Object.keys(this.state.selectedToppings).forEach(id=>{
                total += this.props.toppings[id].price;
            });
           return <div className="pizza-checkout-container">
               <div>Total: <a>{formatPrice(total)}</a></div>
               <button onClick={this.handleSubmit}>Add To Cart</button>
            </div>;
        }
        else{
            return <a>Please Select a Size</a>;
        }
    }
    generateToppingsSelect(){
        const toppingBoxes = this.state.toppings.map((topping, idx)=>(
            <div key={`toppingBox${topping.id}`}className="pizza-customizaton-form_group">
                <input type="checkBox" id={`toppingBox${topping.id}`}
                 checked={!!this.state.selectedToppings[topping.id]}
                 onChange={this.handleToppingSelect} value={topping.id}/>
                <label htmlFor={`toppingBox${topping.id}`}>
                    {topping.name}<a>{formatPrice(topping.price)}</a>    
                </label>
            </div>
        ));
        return(
        <div className="pizza-customization-form_group"> 
            <fieldSet className="toppings-select-fieldSet">
                <legend>Choose your Toppings</legend>
                {toppingBoxes}
            </fieldSet>
        </div>
        );
    }


    render(){
        return(
            <div className= "order-component">
                <h2> Order a Pizza</h2>
                <form className="pizza-customization-form">
                    {this.generateSizeSelect()}
                    {this.generateToppingsSelect()}
                </form>
                {this.renderCheckout()}    
            </div>
        );
    }
}