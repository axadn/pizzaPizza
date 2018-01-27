import React from "react";

export default class SessionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }
    handleChange(key){
        return e=>{
            e.stopPropagation();
            e.preventDefault();
            this.setState({[key]: e.value});
        }
    }
    handleSumbit(e){
        e.stopPropagation();
        e.preventDefault();
        
    }
    render(){
        return <form className="session-form">
            <div className="session-form_group">
                <label htmlFor="username">username</label>
                <input type="text" name="username"/>
            </div>
            <div className="session-form_group">
                <label htmlFor="password">password</label>
                <input type="password" name="password"/>
            </div>
        </form>
    }
}