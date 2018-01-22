import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import allClasses from './classes';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import AppTodo from 'todo';

class TodoApp extends React.Component{
    constructor(){
        super();
        this.state={
             logout:false,
             isAuthenticated:false
        }
    }
    componentWillMount(){
        if(localStorage.length>0){
            this.setState({isAuthenticated:true});
        }
    }
    logouthandler=()=>{
        axios.get(`http://localhost:5497/logout`).then((res)=>{alert(`logout success`)}).catch((err)=>{console.log(err.message)});
        localStorage.clear();
        this.setState({logout:true});

    };
    render(){
        return(
            this.state.isAuthenticated ? this.state.logout ? <Redirect to="/"/> :
        <div>
            <h1>todo app</h1>
            <button className={allClasses.btn} style={{position:"absolute",top:"20px",right:"0px"}} onClick={this.logouthandler}>logout</button>
            <div id="heregoestheapp"><AppTodo/></div>
        </div> : <Redirect to="/"/>
        )
    }
}
export default TodoApp;

