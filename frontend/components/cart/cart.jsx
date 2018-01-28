import React from "react";
import {formatPrice} from "Utils/string";

export default class Cart extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount(){
        if(Object.keys(this.props.toppings).length === 0){
            this.props.getSizes(this.handleDataLoaded);
        }
        if(Object.keys(this.props.sizes).length === 0){
            this.props.getToppings(this.handleDataLoaded);
        }
    }
    handleDelete(idx){
        return e=>{
            e.stopPropagation();
            this.props.deletePizza(idx);
        };
    }
    loaded(){
        return Object.keys(this.props.toppings).length > 0 &&
        Object.keys(this.props.sizes).length > 0;
    }
    handleDataLoaded(){
        if(this.props.toppings.length > 0 && this.props.sizes.length > 0){
            this.setState({loaded: true});
        }
    }
    formatPizza(pizza){
        const info = this.props.getPizzaInfo(pizza);
        return {jsx: <div className="cart-pizza-info">
            <div> {info.sizeName}</div>
            <div> {info.toppingNames.join(", ")}</div>
            <div> <a>{formatPrice(info.total)}</a></div>
        </div>,
        total: info.total};
    }
    renderPizzas(){
        let total = 0;
        let pizzaInfo;
        return {jsx: <ul className = "cart-pizza-list">
        {this.props.pizzas.map((pizza, idx)=>{
            pizzaInfo = this.formatPizza(pizza);
            total += pizzaInfo.total;
            return <li key={`cartItem${idx}`}>
                {pizzaInfo.jsx}
                <button onClick ={this.handleDelete(idx)}>delete</button>
            </li>;
        })}
        </ul>,
        total};
    }
    render(){
        if(this.loaded()){
            const pizzas = this.renderPizzas();
            return <div className="cart-component">
                <h2>Your Cart</h2>
                {pizzas.jsx}
                <button onClick={e=> window.location="/#/"}>Add Pizza</button>
                <button>Check out</button>
                <div> Total: <a>{formatPrice(pizzas.total)}</a></div>
            </div>;
        }
        else{
            return <div className="cart-component">
                <h2>Your Cart</h2>
                Loading...
            </div>;
        }
        
    };
}