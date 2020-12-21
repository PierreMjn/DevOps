import React, {memo, useContext, useState} from "react";
import UserContext from "../../context/UserContext";
import {Field} from "../../ui/Field";
import {Button} from "../../ui/Button";
import {Trash, Upload} from "../../ui/Icon";

export const Message = memo(function ({message}) {
    return <li>
        <strong>{message.content}</strong> <i> on {message.channel.title}</i>
    </li>
})

export const MessageRow = memo(function ({message, channel, onUpdate, onDelete}) {
    const [loading, setLoading] = useState(false);

    const user = useContext(UserContext);

    const handleSubmit = async function (e) {
        e.preventDefault();

        setLoading(true);

        const form = e.target;

        const formData = Object.fromEntries(new FormData(form));
        const userData = {user};

        const channelData = {channel};

        const data = {...formData, ...userData, ...channelData};

        try {
            await onUpdate(message, data);

        } catch (e) {
            throw e;
        }
        setLoading(false);
    }

    const handleDelete = async function (e) {
        e.preventDefault();
        setLoading(true);

        try {
            await onDelete(message);

        } catch (e) {
            throw e;
        }
    }

    return <li className="mt-3 mb-3">
        {user.id === message.user.id ?
            <>
                <form className="d-flex align-items-start" onSubmit={handleSubmit}>
                    <Field defaultValue={message.content} name="content" className="mr-2"/>
                    <Button type="submit" loading={loading}><Upload/></Button>
                    <Button type="danger" onClick={handleDelete} loading={loading}><Trash/></Button>
                </form>
            </>
            : user.role === 'ROLE_ADMIN' ?
                <>
                    <form className="d-flex align-items-start" onSubmit={handleSubmit}>
                        <Field defaultValue={message.content} name="content" className="mr-2"/>
                        <Button type="danger" onClick={handleDelete} loading={loading}><Trash/></Button>
                    </form>
                </>
                :
                <>
                    <strong>{message.content}</strong> <i> from {message.user.fullName}</i>
                </>
        }
    </li>
})