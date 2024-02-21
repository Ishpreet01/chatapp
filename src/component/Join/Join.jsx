import React, { useState } from 'react';
import "./Join.css";
import logo from "../../images/logo.png" 
import {Link} from "react-router-dom";

let user;

const sendUser = () =>{
    user=document.getElementById('joinInput').value;
    document.getElementById('joinInput').value='';

}

const Join = () => {
  
  const [name,setname]=useState("");

  return (
    <div className="JoinPage">
        <div className="JoinContainer">
            <img src={logo} alt="" />
            <h1>Join PAGE</h1>
            <input onChange={(e)=>setname(e.target.value)} type="text" id="joinInput" placeholder='Enter Your Name'/>
            <Link onClick={(e)=> !name?e.preventDefault():null} to="/chat"><button onClick={sendUser} className='joinbtn'>Start Chat</button></Link>
       </div>
    </div>
  )
}

export default Join;
export {user};
