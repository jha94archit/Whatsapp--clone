import { Avatar, IconButton } from '@material-ui/core'
import { ChatBubbleRounded, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import db from './firebase'
import { useStateValue } from './StateProvider'

function Sidebar() {
    const [{ user }] = useStateValue()
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
             setRooms(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data(),
                })
                ))
        ))
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar  src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <ChatBubbleRounded />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>  
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id}
                        name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
