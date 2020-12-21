import React, {useState} from "react"
import {ErrorAlert} from "../../ui/Alert";
import {Button} from "../../ui/Button";
import {Modal} from "../../ui/Modal";
import {ApiErrors, apiFetch} from "../../utils/api";

export function LoginForm({onConnect, onClick}) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async function (e) {
        e.preventDefault();

        setError(null);
        setLoading(true);

        const form = e.target;

        const data = Object.fromEntries(new FormData(form));

        try {
            const user = await apiFetch('/login', {
                method: 'POST',
                body: data,
                dataType: 'json'
            });

            onConnect(user);

        } catch (e) {
            if (e instanceof ApiErrors) {
                setError(e.errors[0].message);
            } else {
                console.error(e);
            }
            setLoading(false);
        }
    }

    const handleClose = function (e) {
        e.preventDefault();
        setError('Need to sign in with your account');
    }

    return <Modal onClose={handleClose} title="">
        <form onSubmit={handleSubmit}>
            <div onClose={handleClose}/>
            <div className="background">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <h3>Welcome To ECE-Chat</h3>
                        <h2 className="active"> Sign In </h2>
                        <a href="#register" className="a-login inactive underlineHover"
                           onClick={() => onClick('register')}> Sign Up </a>
                        <div className="form-group">
                            {error && <ErrorAlert>{error}</ErrorAlert>}
                            <input type="email" name="email" id="email" className="form-control fadeIn second"
                                   placeholder="Email" required/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" id="password" className="form-control fadeIn third"
                                   placeholder="Password" required/>
                        </div>
                        <input type="submit" loading={loading} className="fadeIn fourth" value="Log In"/>
                    </div>
                </div>
            </div>
        </form>
    </Modal>
}