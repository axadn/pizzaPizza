import React from "react";

export default class AdminDash extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    loaded(){
        return Object.keys(this.props.toppings).length > 0 &&
        Object.keys(this.props.sizes).length > 0;
    }
    componentWillMount(){
        if(this.loaded()){
            this.setState({
                sizes: this.formatPrices(this.sortSizes(this.props.sizes)),
                toppings: this.formatPrices(this.sortToppings(this.props.toppings))      
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
            sizes: this.formatPrices(this.sortSizes(newProps.sizes)),
            toppings: this.formatPrices(this.sortToppings(newProps.toppings))        
        });
    }
    formatPrices(collection){
        let copy;
        for(let i = 0; i <collection.length; ++i){
            if(collection[i].price.toFixed){
                copy = Object.assign({}, collection[i]);
                copy.price = copy.price.toFixed(2);
                collection[i] = copy;
            }
        }
        return collection;
    }
    handleChange(key1, key2, key3){
        return e=>{
            const newState = ({}, this.state);
            newState[key1][key2][key3] = e.target.value;
            this.setState(newState);
        };
    }
    handlePriceInput(e){
        e.target.value = Math.abs(e.target.value).toFixed(2);
    }
    handleSubmit(){

    }
    loaded(){
        return Object.keys(this.props.toppings).length > 0 &&
        Object.keys(this.props.sizes).length > 0;
    }
    renderSizesEdit(){
        return <fieldset>
            <legend>Edit Sizes</legend>
            {this.state.sizes.map((size, idx)=>{
                return <div className="dashboard-size-edit-group" key={`size-edit-group${size.id}`}>
                    <input type="text" value={size.name} onChange={this.handleChange("sizes",idx,"name")}/>
                    $
                    <input type="number" min="0.01" max="1000.00" step="0.01" 
                        value={size.price} onBlur={this.handlePriceInput} onChange={this.handleChange("sizes",idx,"price")}/>
                </div>;
            })}
        </fieldset>;
    }
    sortToppings(toppings){
        return Object.keys(toppings).map(id=>toppings[id]).sort((toppingA, toppingB)=>
            (toppingA.name < toppingB.name)? -1 : 1
        );
    }
    sortSizes(sizes){
        return Object.keys(sizes).map(id=>sizes[id]).sort((sizeA, sizeB)=>
            (sizeA.price < sizeB.price)? -1 : 1 
        );
    }
    renderToppingsEdit(){
        return <fieldset>

        </fieldset>;
    }
    render(){
        if(this.loaded()){
            return <div className="admin-dash-component">
                {this.renderSizesEdit()}
            </div>;
        }
        else{
            return <div className="admin-dash-component"> 
                Loading...
            </div>
        }
        
    }

}