import React, {useState} from "react";
import PropTypes from "prop-types"
import {RegisterForm} from "./RegisterForm";
import {LoginForm} from "./LoginForm";

export function Authentication({onConnect}) {
    const [page, setPage] = useState('login');

    let content = null;
    if (page === 'login') {
        content = <LoginForm onConnect={onConnect} onClick={setPage}/>
    } else if (page === 'register') {
        content = <RegisterForm onClick={setPage}/>
    }

    return <>
        {content}
    </>
}

LoginForm.propTypes = {
    onConnect: PropTypes.func.isRequired
}