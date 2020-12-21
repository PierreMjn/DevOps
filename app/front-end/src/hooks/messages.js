import {useCallback, useReducer} from "react";
import {apiFetch} from "../utils/api";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCHING_MESSAGES':
            return {...state, loading: true}
        case 'SET_MESSAGES':
            return {...state, messages: action.payload, loading: false}
        case 'ADD_MESSAGE':
            return {...state, messages: [...state.messages, action.payload]}
        case 'UPDATE_MESSAGE':
            return {...state, messages: state.messages.map(m => m === action.target ? action.payload : m)}
        case 'DELETE_MESSAGE':
            return {...state, messages: state.messages.filter(m => m !== action.payload)}
        default:
            throw new Error('Action inconnue ' + action.type)
    }
}

export function useMessages() {
    const [state, dispatch] = useReducer(reducer, {
        messages: null,
        loading: false
    })

    return {
        messages: state.messages,
        fetchMessages: useCallback(async function () {
            if (state.loading) {
                return;
            }
            dispatch({type: 'FETCHING_MESSAGES'})
            const messages = await apiFetch('/messages')
            dispatch({type: 'SET_MESSAGES', payload: messages})
        }, [state]),
        createMessage: useCallback(async function (data) {
            const newMessage = await apiFetch('/messages', {
                method: 'POST',
                body: data
            })
            dispatch({type: 'ADD_MESSAGE', payload: newMessage})
        }, []),
        updateMessage: useCallback(async function (message, data) {
            const newMessage = await apiFetch('/messages/' + message.id, {
                method: 'PUT',
                body: data,
            })
            dispatch({type: 'UPDATE_MESSAGE', payload: newMessage, target: message})
        }, []),
        deleteMessage: useCallback(async function (message) {
            await apiFetch('/messages/' + message.id, {
                method: 'DELETE',
            })
            dispatch({type: 'DELETE_MESSAGE', payload: message})
        }, []),
    }

}
