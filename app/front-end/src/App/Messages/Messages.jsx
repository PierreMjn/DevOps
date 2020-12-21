import React, {useContext} from "react";
import {Loader} from "../../ui/Loader";
import UserContext from "../../context/UserContext";
import {Message} from "./Message";

export function Messages({messages}) {
    return <>
        <h1 className="mt-3 mb-3">Messages send</h1>
        {messages === null ? <Loader/> :
            <MessagesList messages={messages}/>}
    </>
}

function MessagesList({messages}) {
    const user = useContext(UserContext);
    const filteredMessages = messages.filter(m => m.user.id === user.id);

    return <div>
        {filteredMessages.length === 0 ? <h5 className="text-danger mt-3 mb-3">No message</h5> :
            filteredMessages.map(m => <Message key={m.id} message={m}/>)}
    </div>
}