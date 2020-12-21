import React, {useContext} from "react";
import UserContext from "../../context/UserContext";
import {Field} from "../../ui/Field";
import {Button} from "../../ui/Button";

export function MessageForm({channel, onSubmit, onClick}) {
    const user = useContext(UserContext);

    const handleSubmit = async function (e) {
        e.preventDefault();

        const form = e.target;

        const formData = Object.fromEntries(new FormData(form));
        const userData = {user};

        const channelData = {channel};

        const data = {...formData, ...userData, ...channelData};

        try {
            await onSubmit(data);
            form.reset();
            onClick();

        } catch (e) {
            throw e;
        }
    }

    return <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
            <Field name="content" placeholder="Message..." required/>
        </div>
        <div className="col-md-12">
            <Button type="submit">Send</Button>
        </div>
    </form>
}