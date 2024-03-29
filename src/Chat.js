import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import db from './firebase';
import { useStateValue } from './StateProvider'
import firebase from 'firebase'

function Chat() {

    const [seed, setseed] = useState('')
    const [input, setInput] = useState("")
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState("")
    const [{ user }] = useStateValue()
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();

    db.collection('rooms').doc(roomId).collection('messages')
    .add({
        name: user.displayName,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
        setInput("")
    };

    useEffect(() => {
        if (roomId) {
           db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
               setRoomName(snapshot.data().name)
           ))
           
           db.collection('rooms').doc(roomId)
           .collection('messages').orderBy('timestamp', 'asc')
           .onSnapshot(snapshot => (
               setMessages(snapshot.docs.map(doc => doc.data()))
           ))
        }
    }, [roomId])

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p> last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${ message.name === user.displayName && 'chat__reciever'}`}>
                    <span className="chat__name">{message.name}</span>
                        {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}
                
                
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
