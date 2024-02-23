import React ,{useEffect,useState} from 'react';
import {user} from "../Join/Join.jsx";
import socketIo from "socket.io-client";
import './Chat.css';
import Message from "../Message/Message.jsx";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT="http://localhost:3000";

let socket;

const Chat = () => {

    const [id,setid]=useState('');
    const [messages,setMessages] = useState([]);

    const send=()=>{
      const message=document.getElementById('chatInput').value;
      socket.emit('message',{message,id});
      document.getElementById('chatInput').value='';
    }

    console.log(messages);

  useEffect(()=>{
    socket=socketIo(ENDPOINT,{transports:['websocket']});

    socket.on("connect",()=>{
      console.log("connected");
      setid(socket.id);
    });

    socket.emit('joined',{user});

    socket.on('welcome',(data)=>{  //used to listen for events that are sent from the server (for client-side) or events that are sent from the client (if used on the server side)
        setMessages([...messages,data]);
        console.log(data.user,data.message);
    })

    socket.on('userJoined',(data)=>{
      setMessages([...messages,data]);
        console.log(data.user,data.message);
    })

    socket.on('leave',(data)=>{
      setMessages([...messages,data]);
      console.log(data.user,data.message);
      })

    return ()=>{
       socket.emit('userdisconnect');
       socket.off();
    }
  },[])

  useEffect(() => {
    socket.on('sendMessage', (data) => {
        setMessages([...messages,data]);
         console.log(data.user,data.message,data.id);
    })
    return () => {
      socket.off();
    }
  }, [messages])
  

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='header'>
          <a href="/">
        <span className="material-symbols-outlined closeIcon">close</span> </a>
        </div>
        <ReactScrollToBottom className='chatBox'>
         {messages.map((item,i)=> <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
        </ReactScrollToBottom>
        <div className='inputBox'>
          <input onKeyPress={(event)=>event.key==='Enter'?send():null} type="text" id="chatInput" />
          <button onClick={send} className='sendBtn'><span className="material-symbols-outlined sendIcon">send</span></button>
        </div>
        </div>   
    </div>

  )
}

export default Chat