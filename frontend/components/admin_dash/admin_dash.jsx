import React from "react";

export default class AdminDash extends React.Component{
    constructor(props){
        super(props);
    
    }
    componentDidMount(){
        
    }
    renderSizesEdit(){
        return <fieldset></fieldset>
    }
    renderToppingsEdit(){
        return <fieldset></fieldset>
    }
    render(){
        return <div className="admin-dash-component">
        </div>;
    }

}