import React, {memo, useState} from "react";
import PropTypes from "prop-types";
import {Loader} from "../../ui/Loader";
import {Field} from "../../ui/Field";
import {Button} from "../../ui/Button";
import {Trash, Upload} from "../../ui/Icon";

export function Users({users, onUpdate, onDelete}) {
    return <div>
        <h1>Users</h1>
        {users === null ? <Loader/> :
            <UsersList users={users} onUpdate={onUpdate} onDelete={onDelete}/>}
    </div>
}

Users.propTypes = {
    users: PropTypes.array,
}

function UsersList({users, onUpdate, onDelete}) {
    return <div>
        {users.map(user => <User key={user.id} user={user} onUpdate={onUpdate} onDelete={onDelete}/>)}
    </div>
}

const User = memo(function ({user, onUpdate, onDelete}) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async function (e) {
        e.preventDefault();

        setLoading(true);

        const form = e.target;

        const data = Object.fromEntries(new FormData(form));

        try {
            await onUpdate(user, data);

        } catch (e) {
            throw e;
        }
        setLoading(false);
    }

    const handleDelete = async function (e) {
        e.preventDefault();

        setLoading(true);

        try {
            await onDelete(user);

        } catch (e) {
            throw e;
        }
    }

    return <form className="d-flex align-items-start" onSubmit={handleSubmit}>
        <div className="mr-2 mt-2">{user.email}</div>
        <Field defaultValue={user.fullName} name="fullName" className="mr-2"/>
        <Field defaultValue={user.role} name="role" className="mr-2"/>
        <Button type="submit" loading={loading}><Upload/></Button>
        <Button type="danger" onClick={handleDelete} loading={loading}><Trash/></Button>
    </form>
})