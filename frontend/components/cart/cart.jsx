import React from "react";
import {formatPrice} from "Utils/string";

export default class Cart extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(idx){
        return e=>{
            e.stopPropagation();
            this.props.deletePizza(idx);
        };
    }
    formatPizza(pizza){
        const info = this.props.getPizzaInfo(pizza);
        return <div className="cart-pizza-info">
            <div> {info.sizeName}</div>
            <div> {info.toppingNames.join(", ")}</div>
            <div> {formatPrice(info.total)}</div>
        </div>
    }
    renderPizzas(){
        return <ul className = "cart-pizza-list">
        {this.props.pizzas.map((pizza, idx)=>(
            <li key={`cartItem${idx}`}>
                {this.formatPizza(pizza)}
                <button onClick ={this.handleDelete(idx)}>delete</button>
            </li>
        ))}
        </ul>;
    }
    render(){
        return <div className="cart-component">
            {this.renderPizzas()}
            <button onClick={e=> window.location="/#/"}>Add Pizza</button>
            <button>Check out</button>
        </div>
    };
}