import React, {useCallback, useContext, useState} from "react";
import {Field} from "../../ui/Field";
import {Button} from "../../ui/Button";
import UserContext from "../../context/UserContext";
import {Loader} from "../../ui/Loader";
import {Trash} from "../../ui/Icon";

export function CreateChannelForm({users, onSubmit}) {
    return <ChannelForm users={users} onSubmit={onSubmit} button="Create"/>
}

export function EditChannelForm({users, onSubmit, channel}) {
    return <ChannelForm users={users} onSubmit={onSubmit} channel={channel} button="Editer"/>
}

function ChannelForm({users, onSubmit, channel = {}, button}) {
    const user = useContext(UserContext);

    if (Object.keys(channel).length === 0) {
        channel.channelUsers = [user];
    }

    const {
        users: channelUsers,
        addUser,
        deleteUser,
        resetUser
    } = useUsers(channel.channelUsers);

    const filteredUsers = (users || []).filter(user => {
        return !channelUsers.some(u => u.id === user.id);
    })

    const handleSubmit = async function (e) {
        e.preventDefault();

        const form = e.target;

        const members = {channelUsers};
        const dataForm = Object.fromEntries(new FormData(form));

        const data = {...dataForm, ...members};

        try {
            await onSubmit(data);
            form.reset();
            resetUser();

        } catch (e) {
            throw e;
        }
    }

    return <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
            <Field name="title" defaultValue={channel.title} required>Title</Field>
            <Field name="creator" type="hidden" defaultValue={user.id} required/>
        </div>
        <div className="col-md-6">
            <h5>Members</h5>
            {channelUsers.map(u => <UserRow user={u} key={u.id} onDelete={deleteUser}/>)}
            {users ? <Select users={filteredUsers} onChange={addUser}/> : <Loader/>}
        </div>
        <div className="col-md-12 mt-3">
            <Button type="submit">{button}</Button>
        </div>
    </form>
}

function UserRow({user, onDelete}) {
    return <div className="d-flex mb-3 align-items-center">
        <div className="mr-2">{user.fullName}</div>
        <Button className="btn btn-danger" onClick={() => onDelete(user)}><Trash/></Button>
    </div>
}

function Select({users, onChange}) {
    const handleChange = function (e) {
        onChange(users[parseInt(e.target.value, 10)]);
    }

    return <select className="form-control" onChange={handleChange}>
        <option>Add a member</option>
        {users.map((u, k) =>
            <option key={u.id} value={k}>
                {u.fullName}
            </option>
        )}
    </select>
}

function useUsers(initial) {
    const [users, setUsers] = useState(initial || []);

    return {
        users: users,
        addUser: useCallback(function (user) {
            setUsers(state => [...state, user])
        }, []),
        deleteUser: useCallback(function (user) {
            setUsers(state => state.filter(u => u !== user))
        }, []),
        resetUser: useCallback(function () {
            setUsers([])
        }, [])
    }
}