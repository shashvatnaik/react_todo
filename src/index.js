import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import allClasses from './classes';
import axios from 'axios';
import {BrowserRouter,NavLink,Route} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

class Tail extends React.Component{
    render(){

        return(
            <h4 className={allClasses.tail}>this app was created by shashvat naik!</h4>
        )
    }
}

class Head extends React.Component{
    render(){

        return(
            <center><h1 className={allClasses.header}>TODOs</h1></center>
        )
    }
}


class Main extends React.Component{
    constructor(){
        super();
        this.state={
            emvalue:``,
            passvalue:``,
            username:``,
            pass2:``,
            isAuthenticated:false,
            reg:true
            }
    }
    loginhandler=()=>{
        axios.post(`http://localhost:5497/login`,{username:this.state.emvalue,password:this.state.passvalue}).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)});
    };

    reghandler=()=>{
        if(this.state.passvalue===this.state.pass2){
            axios.post(`http://localhost:5497/reg`,{username:this.state.username,email:this.state.emvalue,password:this.state.passvalue}).then((data)=>{console.log(data);alert(`account successfully created`)}).catch((err)=>{
                console.log(err);
                alert(`there was an error creating the account please try again!`);
                document.getElementById(`msg`).innerHTML=`<br><h4 style="color:red">${err.message}</h4>`;
            });
        }else{
            document.getElementById(`msg`).innerHTML=`<br><h4 style="color:red">the passwords doesnt match!</h4>`;
            alert(`the passwords doesnt match!`);
        }

    };

    render(){
        return(
            this.state.reg ?  <div style={{margin: "100px 500px"}} className={allClasses.greenback}>
                <center><h3 className={allClasses.subheader}>Login</h3><br/>
                    <input className={allClasses.inp} type="text" value={this.state.emvalue}
                           placeholder="enter your email" onChange={(e) => {
                        this.setState({emvalue: e.target.value});
                    }
                    }/>
                    <br/><input type="text" className={allClasses.inp} value={this.state.passvalue}
                                placeholder="enter your password" onChange={(e) => {
                        this.setState({passvalue: e.target.value});
                    }
                    }/><br/>
                    <button className={allClasses.btn} style={{"&:hover": "red"}}
                            onClick={this.loginhandler}>Login
                    </button>
                    <button className={allClasses.btn} style={{"&:hover": "red"}} onClick={() => {
                        this.setState({reg: !this.state.reg})
                    }}>Register here!
                    </button>
                </center>
            </div> : <div style={{margin: "100px 500px"}} className={allClasses.greenback}><center>
                <form><input type="email" className={allClasses.inp} value={this.state.emvalue}
                       placeholder="enter your email" onChange={(e) => {
                    this.setState({emvalue: e.target.value});
                }
                }/><br/><input type="text" className={allClasses.inp} value={this.state.username}
                               placeholder="enter your username" onChange={(e) => {
                this.setState({username: e.target.value});
            }
            }/><br/>
                <input type="password" className={allClasses.inp} value={this.state.passvalue}
                       placeholder="enter your password" onChange={(e) => {
                    this.setState({passvalue: e.target.value});
                }
                }/><br/><input type="password" className={allClasses.inp} value={this.state.pass2}
                               placeholder="re-enter your password" onChange={(e) => {
                this.setState({pass2: e.target.value});
            }
            }/><br/><button type="submit" className={allClasses.btn} style={{"&:hover": "red"}} onClick={this.reghandler}>Register now!
            </button><button className={allClasses.btn} style={{"&:hover": "red"}} onClick={()=>{this.setState({reg:!this.state.reg})}}>log in
                    </button></form><br/>
                <div id="msg"></div>
            </center>
            </div>
        )
    }
}
ReactDOM.render(<div><Head/>
    <BrowserRouter>
        <Route path="/" component={Main}/>
    </BrowserRouter>
    <Tail/></div>, document.getElementById('root'));
registerServiceWorker();
