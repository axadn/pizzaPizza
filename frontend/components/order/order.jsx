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
    loaded(){
        return Object.keys(this.props.toppings).length > 0 &&
        Object.keys(this.props.sizes).length > 0;
    }
    componentWillMount(){
        if(this.loaded()){
            this.setState({
                sizes: this.sortSizes(this.props.sizes),
                toppings: this.sortToppings(this.props.toppings)        
            });
        }
        if(Object.keys(this.props.toppings).length === 0){
            this.props.getSizes();
        }
        if(Object.keys(this.props.sizes).length === 0){
            this.props.getToppings();
        }
    }
    componentWillReceiveProps(newProps){
        this.setState({
            sizes: this.sortSizes(newProps.sizes),
            toppings: this.sortToppings(newProps.toppings)        
        });
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
                <a className="selected">{this.state.selectedSize? `$ ${this.formattedSizePrice()}` : ""}</a>
            </fieldSet>
        );
    }

    renderCheckout(){
        if(this.state.selectedSize){
            let total = this.props.sizes[this.state.selectedSize].price;
            Object.keys(this.state.selectedToppings).forEach(id=>{
                total += this.props.toppings[id].price;
            });
           return <fieldSet className="pizza-checkout-container">
                <legend>Total</legend>
               <div><a className="selected">{`$ ${formatPrice(total)}`}</a></div>
               <button onClick={this.handleSubmit}>Add To Cart</button>
            </fieldSet>;
        }
        else{
            return <fieldSet className="pizza-checkout-container">
            <legend>Total</legend>
            Please Select a Size
            </fieldSet>;
        }
    }
    generateToppingsSelect(){
        const toppingBoxes = this.state.toppings.map((topping, idx)=>(
            <div key={`toppingBox${topping.id}`}className="pizza-customizaton-form_group">
                <input type="checkBox" id={`toppingBox${topping.id}`}
                 checked={!!this.state.selectedToppings[topping.id]}
                 onChange={this.handleToppingSelect} value={topping.id}/>
                <label htmlFor={`toppingBox${topping.id}`}>
                    {topping.name}
                    <a className={!!this.state.selectedToppings[topping.id] ? "selected" : ""}>
                        {`$ ${formatPrice(topping.price)}`}
                    </a>    
                </label>
            </div>
        ));
        return(
            <fieldSet className="toppings-select-fieldSet">
                <legend>Choose your Toppings</legend>
                {toppingBoxes}
            </fieldSet>
        );
    }


    render(){
        if(this.loaded()){
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
        else{
            return(
                <div className= "order-component">
                    <h2> Order a Pizza</h2>
                    Loading ...  
                </div>
            );
        }
    }
}