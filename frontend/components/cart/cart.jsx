import React from "react";

export default class Cart extends React.Component{
    constuctor(props){
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
        info = this.props.getPizzaInfo(pizza);
        return <div className="cart-pizza-info">
            <div> {info.sizeName}</div>
            <div> {info.toppingNames.join(", ")}</div>
            <div> {info.total}</div>
        </div>
    }
    renderPizzas(){
        return <ul className = "cart-pizza-list">
        this.props.pizzas.map((pizza, idx)=>{
            <li key={`cartItem${idx}`}>
                {this.formatPizza(pizza)}
                <button onClick ={this.handleDelete(idx)}>delete</button>
            </li>
        });
        </ul>;
    }
    render(){
        <div className="cart-component">
            {renderPizzas()}
            <button onClick={this.props.goToCart}>Add Pizza</button>
            <button>Check out</button>
        </div>
    };
}