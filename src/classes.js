import {style} from 'typestyle';
const btn = style({
backgroundColor:"#05386B",
    color:"white",
    fontWeight:"bold",
    border:"none",
    marginRight:"5px",
    padding:"15px 28px",
    "&:hover":{
    backgroundColor:"white",
        fontWeight:"bold",
        color:"#05386B",
        border:"2px solid #05386B",
        backgroundColor:"#379683"
    }
});

const header=style({
    textAlign:"center",
    color:"#05386B",
    fontWeight:"bold"
});
const tail=style({
    padding:"10px",
    backgroundColor:"#EDF5E1",
    color:""
});
const subheader = style({
    textAlign:"center",
    color:"#EDF5E1"
});
const greenback = style({
    backgroundColor:"#379683"
});
const inp = style({
    backgroundColor:"#EDF5E1",
    color:"#05386B",
    padding:"10px",
    margin:"6px",
    border:"none"
});
const allClasses = {btn,header,tail,subheader,greenback,inp};
export default allClasses;
