import React ,{useEffect} from 'react';
import {user} from "../Join/Join.jsx";
import socketIo from "socket.io-client";
import './Chat.css';

const ENDPOINT="http://localhost:3000";

const Chat = () => {
  const socket=socketIo(ENDPOINT,{transports:['websocket']});

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("connected");
    });

    socket.emit('joined',{user})

    return ()=>{

    }
  },[])

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='header'></div>
        <div className='chatBox'></div>
        <div className='inputBox'>
          <input type="text" id="chatInput" />
          <button className='sendBtn'><span className="material-symbols-outlined sendIcon">send</span></button>
        </div>
        </div>   
    </div>

  )
}

export default Chat