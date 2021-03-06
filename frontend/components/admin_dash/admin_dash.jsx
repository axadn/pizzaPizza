import React from "react";

export default class AdminDash extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.freshState = this.freshState.bind(this);
        this.setState = this.setState.bind(this);
    }
    loaded(){
        return Object.keys(this.props.toppings).length > 0 &&
        Object.keys(this.props.sizes).length > 0;
    }
    freshState(key, props){
        return{
            [key]: this.formatCollection(this[`sort${key[0].toUpperCase() + key.slice(1)}`](props[key])),
            [`${key}Edits`]: {}    
        };
    }
    componentWillMount(){
        if(this.loaded()){
            this.setState(this.freshState("sizes", this.props));
            this.setState(this.freshState("toppings", this.props));
        }
        if(Object.keys(this.props.toppings).length === 0){
            this.props.getSizes();
        }
        if(Object.keys(this.props.sizes).length === 0){
            this.props.getToppings();
        }
    }
    componentWillReceiveProps(newProps){
        if(JSON.stringify(newProps.sizes) !== JSON.stringify(this.props.sizes)){
            this.setState(this.freshState("sizes", newProps));
        }
        else this.setState(this.freshState("toppings", newProps));
    }
    formatCollection(collection){
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
        const editKey = key1 + "Edits";
        return e=>{
            e.preventDefault();
            e.stopPropagation();
            const newState = ({}, this.state);
            if(newState[editKey][key2]){
                if(newState[key1][key2][key3]=== e.target.value){
                    debugger;
                    delete newState[editKey][key2][key3];
                    if(Object.keys(newState[editKey][key2]).length === 1){
                        debugger;
                        delete newState[editKey][key2];
                    }
                }else{
                    newState[editKey][key2][key3] = e.target.value;
                }
            }
            else if (e.target.value !== newState[key1][key2][key3]){
                newState[editKey][key2] = {[key3]: e.target.value, id:newState[key1][key2].id}
            }
            this.setState(newState);
        };
    }
    handleSubmit(key){
        return e=>{
            this.props["put"+key.slice(0,1).toUpperCase()+key.slice(1)](
                Object.values(this.state[key+"Edits"]).map(query=>{
                    if(query.price){ //make sure prices are stored as numbers in redux store, for price totaling
                        const copy = Object.assign({}, query);
                        copy.price = Number(copy.price);
                        return copy;
                    }
                    else return query; 
                })
            ); 
        } 
    }
    handlePriceBlur(key1, key2, key3){
        const changeHandler = this.handleChange(key1,key2,key3);
        return e=>{
            e.stopPropagation();
            e.preventDefault();
            const price = parseFloat(e.target.value);
            e.target.value = Math.min(999.99, price).toFixed(2);
            changeHandler(e);
        }
    }
    loaded(){
        return Object.keys(this.props.toppings).length > 0 &&
        Object.keys(this.props.sizes).length > 0;
    }
    renderEditGroup(key){
        let name, price, nameDirty, priceDirty;
        const editKey = key + "Edits";
        let editsCount = 0;
        return <fieldset>
            <legend>Edit {key}</legend>
            {this.state[key].map((el, idx)=>{
                if(this.state[editKey][idx] && this.state[editKey][idx].hasOwnProperty("name")){
                    name = this.state[editKey][idx].name;
                    nameDirty = true;
                    ++editsCount;
                }
                else{
                    name = el.name;
                    nameDirty = false;
                }
                if(this.state[editKey][idx] && this.state[editKey][idx].hasOwnProperty("price")){
                    price = this.state[editKey][idx].price;
                    priceDirty = true;
                    ++editsCount;
                } 
                else{
                    price = el.price;
                    priceDirty = false;
                }
                return <div className={`dashboard-${key}-edit-group`} key={`size-${key}-group${el.id}`}>
                    <input type="text" className={nameDirty? "dirty": ""}
                     value={name} onChange={this.handleChange(key,idx,"name")}/>
                    $
                    <input type="number" min="0.01" max="999.99" step="0.01" className={priceDirty? "dirty": ""} 
                        value={price} onBlur={this.handlePriceBlur(key,idx,"price")} 
                        onChange={this.handleChange(key,idx,"price")}/>
                </div>;
            })}
            {editsCount > 0 ? 
                        <div className={`dashboard-${key}-edits-save-container`}>
                            <div><a className="dirty">{editsCount}</a> unsaved changes</div>
                            <button onClick={this.handleSubmit(key)} >Apply Changes</button>
                            <button onClick={()=>this.setState(this.freshState(key, this.props))}> Revert</button>
                        </div>
                    :""}
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
    render(){
        if(this.loaded()){
            return <div className="admin-dash-component">
                {this.renderEditGroup("sizes")}
                {this.renderEditGroup("toppings")}
            </div>;
        }
        else{
            return <div className="admin-dash-component"> 
                Loading...
            </div>
        }
    }
}