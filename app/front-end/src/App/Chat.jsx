import React, {useContext, useEffect, useState} from "react"
import {useUsers} from "../hooks/users";
import {Users} from "./Users/Users";
import {User} from "./Users/User";
import {Channels} from "./Channels/Channels";
import {useChannels} from "../hooks/channels";
import {Channel} from "./Channels/Channel";
import {Messages} from "./Messages/Messages";
import {useMessages} from "../hooks/messages";
import UserContext from "../context/UserContext";
import {Logout} from "./Authentication/Logout";

export function Chat() {
    const [page, setPage] = useState('profile');
    const [theme, setTheme] = useState('navbar-dark bg-primary');

    const {
        users,
        fetchUsers,
        updateUser,
        deleteUser,
        logout
    } = useUsers();

    const {
        channels,
        channel,
        fetchChannels,
        fetchChannel,
        createChannel,
        updateChannel,
        deleteChannel,
        deselectChannel
    } = useChannels();

    const {
        messages,
        fetchMessages,
        createMessage,
        updateMessage,
        deleteMessage
    } = useMessages();

    let content = null;
    if (page === 'profile') {
        content = <User onUpdate={updateUser} setTheme={setTheme}/>;
    } else if (page === 'users') {
        content = <Users users={users} onUpdate={updateUser} onDelete={deleteUser}/>;
    } else if (page === 'channels') {
        content = <Channels channels={channels} users={users} onClick={fetchChannel} onSubmit={createChannel}/>;
    } else if (page === 'messages') {
        content = <Messages messages={messages}/>;
    } else if (page === 'logout') {
        content = <Logout/>;
    }

    useEffect(function () {
        if (page === 'users') {
            fetchUsers();
        } else if (page === 'profile') {
            fetchMessages();
            fetchUsers();
        } else if (page === 'channels') {
            fetchChannels();
            fetchUsers();
        } else if (page === 'messages') {
            fetchMessages();
        } else if (page === 'logout') {
            logout();
        }
    }, [page]);

    return <>
        <NavBar currentPage={page} onClick={setPage} theme={theme}/>
        <div className="container">
            {channel ? <Channel
                users={users}
                channel={channel}
                messages={messages}
                onEdit={fetchUsers}
                onCreate={createMessage}
                onUpdate={updateMessage}
                onDelete={deleteMessage}
                onUpdateC={updateChannel}
                onDeleteC={deleteChannel}
                onClose={deselectChannel}
            /> : null}
            {content}
        </div>
    </>
}

function NavBar({currentPage, onClick, theme}) {
    const user = useContext(UserContext);
    const navTheme = "navbar navbar-expand-sm " + theme;

    const navClass = function (page) {
        let className = 'nav-item';

        if (page === currentPage) {
            className += ' active';
        }

        return className;
    }

    return <nav className={navTheme}>
        <a href="#channels" className="navbar-brand"
           onClick={() => onClick('channels')}>Chat App</a>

        <ul className="navbar-nav mr-auto">
            <li className={navClass('profile')}>
                <a href="#profile" className="nav-link"
                   onClick={() => onClick('profile')}>My Account</a>
            </li>

            <li className={navClass('channels')}>
                <a href="#channels" className="nav-link"
                   onClick={() => onClick('channels')}>My Channels</a>
            </li>

            <li className={navClass('messages')}>
                <a href="#messages" className="nav-link"
                   onClick={() => onClick('messages')}>History</a>
            </li>

            {user.role === 'ROLE_ADMIN' ?
                <li className={navClass('users')}>
                    <a href="#users" className="nav-link"
                       onClick={() => onClick('users')}>My Admin</a>
                </li> : null}
        </ul>
        <button className="btn btn-outline-light" onClick={() => onClick('logout')}>Logout</button>
    </nav>
}