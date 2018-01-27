import React from "react";

export default class SessionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
    }
    handleChange(key){
        return (e=>{
            e.stopPropagation();
            e.preventDefault();
            this.setState({[key]: e.target.value});
        }).bind(this);
    }
    handleSumbit(e){
        e.stopPropagation();
        e.preventDefault();
        if(this.props.mode === "login"){
            this.props.postSession(this.state);
        }
        else{
            this.props.postUser(this.state);
        }
    }
    render(){
        return <form className="session-form" onSubmit={this.handleSumbit}>
            <div className="session-form_group">
                <label htmlFor="username">username</label>
                <input type="text" name="username" onChange={this.handleChange("username")}/>
            </div>
            <div className="session-form_group">
                <label htmlFor="password">password</label>
                <input type="password" name="password" onChange={this.handleChange("password")}/>
            </div>
            <button type="submit">submit</button>
        </form>
    }
}