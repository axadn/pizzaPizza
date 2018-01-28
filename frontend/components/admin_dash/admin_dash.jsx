import React from "react";

export default class AdminDash extends React.Component{
    constructor(props){
        super(props);
    
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
    handleToppingSubmit(e){
        
    }
    handleSizeSubmit(e){

    }
    loaded(){
        return Object.keys(this.props.toppings).length > 0 &&
        Object.keys(this.props.sizes).length > 0;
    }
    renderSizesEdit(){
        return <fieldset>
            {this.state.sizes.map(size=>{
                <div className="dashboard-size-edit-group">
                    <input type="number" min="0.00" max="10000.00" step="0.01" />
                </div>
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