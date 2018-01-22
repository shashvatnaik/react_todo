import React from 'react';
import a from './index.css';
import ReactDOM from 'react-dom';
import allClasses from './classes';
import axios from 'axios';

class View extends React.Component{
    constructor(){
        super();
        this.state={
            gg:0
        }
    }

    updatehandler=(e)=>{
        console.log(`update handler e`);
        console.log(e.target);
        this.props.updater(e,e.target.value);
        ReactDOM.unmountComponentAtNode(document.getElementById(`forinp${e.target.id}`));
        this.setState({gg:`update`});
    };
    handler=(e)=>{
        if(this.props.deleter){
            this.props.deleter(e.target);
            this.setState({gg:1});
        }else if(this.props.statusupdater){
            this.props.statusupdater(e);
        }else if(this.props.updater){
            ReactDOM.render(<input type="text" id={e.target.id} onBlur={this.updatehandler}/>,document.getElementById(`forinp${e.target.id}`));
        }
    };
    render(){
        return(
            <ul>{
                this.props.taskdata.map((x,i)=>{
                    return <div><li style={{color:"#05386B"}} id={i} onClick={this.handler} className={ x.status ? "completed":""} key={i}>{x.Task}</li><div id={`forinp${i}`}></div></div>
                })
            }</ul>
        )
    }
}
class AppTodo extends React.Component{
    constructor(){
        super();
        this.state={
            Tasks:[{Task:`do this`,status:false},{Task:`do that`,status:false}]
        }
    }
    componentWillMount(){
        axios.post(`http://localhost:5497/getTask`,{user:localStorage.user}).then((data)=>{
            this.setState({Tasks:data.data});
            console.log(this.state.Tasks)
        }).catch();
    }
    gg=()=>{axios.post(`http://localhost:5497/getTask`,{user:localStorage.user}).then((data)=>{
        this.setState({Tasks:data.data});
        console.log(this.state.Tasks)
    }).catch();};
    addT=(e)=>{
        axios.post(`http://localhost:5497/addTask`,{user:localStorage.user,task:document.getElementById(`newtask`).value}).then(()=>{
            console.log(`task added`);
        }).catch((err)=>{console.log(err)});
        let temptask = this.state.Tasks;
        temptask.push({task:document.getElementById(`newtask`).value,status:false});
        this.setState({Task:temptask});
        document.getElementById(`newtask`).value="";
        let msg=document.createElement(`h4`);
        msg.setAttribute(`class`,`${allClasses.subheader}`);
        msg.innerText=`task added!`;
        e.target.parentElement.appendChild(msg);
    };
    deleteT=(ele)=>{
        let temptask = this.state.Tasks;
        axios.post(`http://localhost:5497/deleteTask`,{user:localStorage.user,task:temptask[ele.id].Task}).then(()=>{
            console.log(`deleted`);
        }).catch((err)=>{
            console.log(err.message);
        });
        temptask.splice(ele.id,1);
        this.setState({Task:temptask});
    };
    statusupdater=(e)=>{
        e.target.className === "completed" ? e.target.className = "" : e.target.className = "completed";
        let temptask = this.state.Tasks;
        temptask[e.target.id].status ? temptask[e.target.id].status=false : temptask[e.target.id].status=true;
        this.setState({Task:temptask});
    };
    updatergg=(e,newValue)=>{
        console.log(e.target);
        let temptask = this.state.Tasks;
        axios.post(`http://localhost:5497/updateTask`,{user:localStorage.user,task:temptask[e.target.id],newtask:newValue}).then(()=>{
            console.log(`deleted`);
        }).catch((err)=>{
            console.log(err.message);
        });


        temptask[e.target.id].task=newValue;
        this.setState({Task:temptask});
    };
    clickhandler=(e)=>{
        if(e.target.id===`show`){
            axios.post(`http://localhost:5497/getTask`,{user:localStorage.user}).then((data)=>{
                this.setState({Tasks:data.data});
                console.log(this.state.Tasks);
                ReactDOM.render(<View classgg={allClasses.greenback} statusupdater={this.statusupdater} taskdata={this.state.Tasks}/>,document.getElementById(`content`));
            }).catch();
        }
        else if(e.target.id===`add`){
            ReactDOM.render(<div><br/><input type="text" id="newtask"/><button id="newtask_btn" onClick={this.addT}>Add task   </button></div>,document.getElementById(`content`))
        }
        else if(e.target.id===`delete`){
            ReactDOM.render(<View taskdata={this.state.Tasks} deleter={this.deleteT}/>,document.getElementById(`content`));
        }
        else if(e.target.id===`update`){
            ReactDOM.render(<View taskdata={this.state.Tasks} updater={this.updatergg}/>,document.getElementById(`content`));
        }
    };
    render(){
        return(
            <div>
                <center><button className={allClasses.btn} id="show" onClick={this.clickhandler}>show tasks</button>
                <button className={allClasses.btn} id="add" onClick={this.clickhandler}>add tasks</button>
                <button className={allClasses.btn} id="delete" onClick={this.clickhandler}>delete tasks</button>
                <button className={allClasses.btn} id="update" onClick={this.clickhandler}>update tasks</button>
                    <div id="content"></div></center>
            </div>
        )
    }
}
export default AppTodo;