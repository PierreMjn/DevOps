import React, {useState} from "react";
import {ApiErrors, apiFetch, ApiSuccesses} from "../../utils/api";
import {Button} from "../../ui/Button";
import {Modal} from "../../ui/Modal";
import {ErrorAlert, SuccessAlert} from "../../ui/Alert";

export function RegisterForm({onClick}) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async function (e) {
        e.preventDefault();

        setError(null);
        setLoading(true);

        const form = e.target;

        const data = Object.fromEntries(new FormData(form));

        try {
            await apiFetch('/register', {
                method: 'POST',
                body: data,
                dataType: 'json'
            });

        } catch (e) {
            if (e instanceof ApiErrors) {
                setError(e.errors[0].message);
            } else if (e instanceof ApiSuccesses) {
                setSuccess(e.successes[0].message);
                form.reset();
            } else {
                console.error(e);
            }
            setLoading(false);
        }
    }

    const handleClose = function (e) {
        e.preventDefault();
        onClick('login');
    }

    return <Modal onClose={handleClose} title="">
        <form onSubmit={handleSubmit}>
            <div className="background">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <h3>Welcome to our Web-Tchat</h3>
                        <h2 className="active"> Sign Up </h2>
                        <a href="#login" className="a-login inactive underlineHover"
                           onClick={() => onClick('login')}> Sign
                            In </a>
                        <div className="form-group">

                            {error && <ErrorAlert>{error}</ErrorAlert>}
                            {success && <SuccessAlert>{success}</SuccessAlert>}

                            <input type="email" name="email" id="email" className="form-control fadeIn first"
                                   placeholder="Email"
                                   required/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="fullName" id="fullName" className="form-control fadeIn second"
                                   placeholder="Full Name" required/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" id="password" className="form-control fadeIn third"
                                   placeholder="Password" required/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password2" id="password2" className="form-control fadeIn third"
                                   placeholder="Confirm Password" required/>
                        </div>
                        <input type="submit" loading={loading} className="fadeIn fourth" value="Register"/>
                    </div>
                </div>
            </div>
        </form>
    </Modal>
}
