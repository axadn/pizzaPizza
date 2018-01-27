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
            toppings: []
        };
        this.props.getSizes();
        this.props.getToppings();
    }
    sortSizes(sizes){
        Object.keys(sizes).map(id=>sizes[id]).sort((sizeA, sizeB)=>
            (sizeA.price < sizeB.price)? -1 : 1 
        );
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

    }
}