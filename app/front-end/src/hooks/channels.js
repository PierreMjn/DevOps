import {useCallback, useReducer} from "react";
import {apiFetch} from "../utils/api";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCHING_CHANNELS':
            return {...state, loading: true}
        case 'SET_CHANNELS':
            return {...state, loading: false, channels: action.payload}
        case 'FETCHING_CHANNEL':
            return {...state, channelId: action.payload.id}
        case 'SET_CHANNEL':
            return {...state, channels: state.channels.map(c => c.id === action.payload.id ? action.payload : c)}
        case 'ADD_CHANNEL':
            return {...state, channels: [action.payload, ...state.channels]}
        case 'UPDATE_CHANNEL':
            return {...state, channels: state.channels.map(c => c === action.target ? action.payload : c)}
        case 'DELETE_CHANNEL':
            return {...state, channels: state.channels.filter(c => c !== action.payload)}
        case 'DESELECT_CHANNEL':
            return {...state, channelId: null}
        default:
            throw new Error('Action inconnue ' + action.type)
    }
}

export function useChannels() {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        channels: null,
        channelId: null,
    })

    const channel = state.channels ? state.channels.find(c => c.id === state.channelId) : null;

    return {
        channels: state.channels,
        channel: channel,
        fetchChannels: useCallback(async function () {
            if (state.loading) {
                return
            }
            dispatch({type: 'FETCHING_CHANNELS'})
            const channels = await apiFetch('/channels')
            dispatch({type: 'SET_CHANNELS', payload: channels})
        }, [state]),
        fetchChannel: useCallback(async function (channel) {
            dispatch({type: 'FETCHING_CHANNEL', payload: channel})

            channel = await apiFetch('/channels/' + channel.id)
            dispatch({type: 'SET_CHANNEL', payload: channel})
        }, []),
        createChannel: useCallback(async function (data) {
            const channel = await apiFetch('/channels', {
                method: 'POST',
                body: data
            })
            dispatch({type: 'ADD_CHANNEL', payload: channel})
        }, []),
        updateChannel: useCallback(async function (channel, data) {
            const newChannel = await apiFetch('/channels/' + channel.id, {
                method: 'PUT',
                body: data,
            })
            dispatch({type: 'UPDATE_CHANNEL', payload: newChannel, target: channel})
        }, []),
        deleteChannel: useCallback(async function (channel) {
            await apiFetch('/channels/' + channel.id, {
                method: 'DELETE',
            })
            dispatch({type: 'DELETE_CHANNEL', payload: channel})
        }, []),
        deselectChannel: function () {
            dispatch({type: 'DESELECT_CHANNEL'})
        },
    }

}