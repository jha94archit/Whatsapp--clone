import { Avatar, IconButton } from '@material-ui/core'
import { ChatBubbleRounded, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React from 'react'
import './Sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <div class="sidebar__header">
                <Avatar />
                <div class="sidebar__headerRight">
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
            <div class="sidebar__search">
                <div class="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>  
            </div>
            <div class="sidebar__chats">

            </div>
        </div>
    )
}

export default Sidebar
