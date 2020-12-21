import {useCallback, useReducer} from "react";
import {apiFetch} from "../utils/api";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCHING_USERS':
            return {...state, loading: true}
        case 'SET_USERS':
            return {...state, users: action.payload, loading: false}
        case 'UPDATE_USER':
            return {...state, users: state.users.map(u => u === action.target ? action.payload : u)}
        case 'DELETE_USER':
            return {...state, users: state.users.filter(u => u !== action.payload)}
        default:
            throw new Error('Action inconnue ' + action.type)

    }
}

export function useUsers() {
    const [state, dispatch] = useReducer(reducer, {
        users: null,
        loading: false
    });

    return {
        users: state.users,
        fetchUsers: useCallback(async function () {
            if (state.loading) {
                return
            }
            dispatch({type: 'FETCHING_USERS'})
            const users = await apiFetch('/users')
            dispatch({type: 'SET_USERS', payload: users})
        }, [state]),
        updateUser: useCallback(async function (user, data) {
            const newUser = await apiFetch('/users/' + user.id, {
                method: 'PUT',
                body: data,
            })
            dispatch({type: 'UPDATE_USER', payload: newUser, target: user})
        }, []),
        deleteUser: useCallback(async function (user) {
            await apiFetch('/users/' + user.id, {
                method: 'DELETE',
            })
            dispatch({type: 'DELETE_USER', payload: user})
        }, []),
        logout: useCallback(async function () {
            await apiFetch('/logout')
        }, [])
    }

}
