import React, {useEffect, useState} from 'react';
import {apiFetch} from "./utils/api";
import {Chat} from "./App/Chat";
import {Authentication} from "./App/Authentication/Authentication";
import UserContext from "./context/UserContext";

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(function () {
        apiFetch('/me')
            .then(setUser)
            .catch(() => setUser(false));
    }, []);

    if (user === null) {
        return null;
    }

    return (
        user ? <UserContext.Provider value={user}> <Chat/> </UserContext.Provider>
            : <Authentication onConnect={setUser}/>
    );
}
