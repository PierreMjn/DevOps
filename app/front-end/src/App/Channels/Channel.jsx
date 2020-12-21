import React, {useContext} from "react";
import PropTypes from "prop-types"
import {Modal} from "../../ui/Modal";
import {Loader} from "../../ui/Loader";
import {useToggle} from "../../hooks";
import UserContext from "../../context/UserContext";
import {EditChannelForm} from "./ChannelForm";
import {MessageRow} from "../Messages/Message";
import {MessageForm} from "../Messages/MessageForm";

export function Channel({users, channel, messages, onEdit, onCreate, onUpdate, onDelete, onUpdateC, onDeleteC, onClose}) {
    const [update, toogleUpdate] = useToggle(false);

    const filteredMessages = messages.filter(m => m.channel.id === channel.id);

    return <Modal onClose={onClose} title={channel.title}>
        {!messages ?
            <Loader/> :
            <ChannelDetail channel={channel} users={users} messages={filteredMessages}
                           onEdit={onEdit} onSubmit={onCreate} onClick={toogleUpdate}
                           onUpdate={onUpdate} onDelete={onDelete}
                           onUpdateC={onUpdateC} onDeleteC={onDeleteC}
            />
        }
    </Modal>
}

function ChannelDetail({users, messages, channel, onEdit, onSubmit, onClick, onUpdate, onUpdateC, onDeleteC, onDelete}) {
    const [editMode, toggleEditMode] = useToggle(false);
    const user = useContext(UserContext);

    const handleUpdate = async function (data) {
        try {
            await onUpdateC(channel, data);
            toggleEditMode();

        } catch (e) {
            throw e;
        }
    }

    const handleDelete = async function (e) {
        e.preventDefault();

        try {
            await onDeleteC(channel);

        } catch (e) {
            throw e;
        }
    }

    const handleEditMode = function () {
        toggleEditMode()
        onEdit()
    }

    return editMode ? <EditChannelForm users={users} channel={channel} onSubmit={handleUpdate}/>
        :
        <>
            {user.id === channel.creator ?
                <>
                    <button className="btn btn-secondary mt-2 mb-3" onClick={handleEditMode}>Edit</button>
                    <button className="btn btn-danger mt-2 mb-3" onClick={handleDelete}>Delete</button>
                </>
                :
                user.role === 'ROLE_ADMIN' ?
                    <>
                        <button className="btn btn-danger ml-1 mt-2 mb-3" onClick={handleDelete}>Delete</button>
                    </>
                    : null
            }
            <h5>Participants</h5>
            <div className="row">
                <div className="col-md-11 border m-3 d-flex align-items-start">
                    {channel.channelUsers.map(cu =>
                        <h6 className="mr-3 mt-3 mb-3" key={cu.id}>{cu.fullName}</h6>
                    )}
                </div>
            </div>
            <h5>Messages</h5>
            <div className="row">
                <div className="col-md-11 border m-3">
                    {messages.length === 0 ?
                        <h5 className="text-danger mt-3 mb-3">No message in this channel</h5>
                        :
                        <ul className="mt-3 mb-3 pl-3">
                            {messages.map(m =>
                                <MessageRow key={m.id} message={m} channel={channel}
                                            onUpdate={onUpdate} onDelete={onDelete}/>
                            )}
                        </ul>
                    }
                </div>
            </div>
            <MessageForm channel={channel} onSubmit={onSubmit} onClick={onClick}/>
        </>
}

Channel.propTypes = {
    channel: PropTypes.object.isRequired,
}