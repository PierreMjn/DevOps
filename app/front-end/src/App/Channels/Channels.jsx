import React, {memo, useContext} from "react";
import PropTypes from "prop-types";
import {Loader} from "../../ui/Loader";
import {Button} from "../../ui/Button";
import {useToggle} from "../../hooks";
import {Modal} from "../../ui/Modal";
import {CreateChannelForm} from "./ChannelForm";
import UserContext from "../../context/UserContext";

export function Channels({channels, users, onClick, onSubmit}) {
    const [add, toogleAdd] = useToggle(false);

    const user = useContext(UserContext);

    if (channels === null) {
        return <Loader/>
    }

    return <>
        <button className="btn btn-primary mt-4" onClick={toogleAdd}>Create a channel</button>
        {add && <Modal onClose={toogleAdd} title={'Create a channel'}>
            <CreateChannelForm users={users} onSubmit={onSubmit}/>
        </Modal>}

        <div className="row">
            {channels.map(channel =>

                user.role === 'ROLE_ADMIN' ?
                    <div className="col-md-4 mt-4" key={channel.id}>
                        <Channel channel={channel} onClick={onClick}/>
                    </div>
                    :
                    channel.channelUsers.map(cu =>
                        cu.id === user.id ?
                            <div className="col-md-4 mt-4" key={channel.id}>
                                <Channel channel={channel} onClick={onClick}/>
                            </div>
                            : null
                    )
            )}
        </div>
    </>
}

const Channel = memo(function ({channel, onClick}) {
    return <div className="card">
        <div className="card-body">
            <div className="card-title">
                {channel.title}
            </div>
            <Button onClick={() => onClick(channel)}>Enter channel</Button>
        </div>
    </div>
})

Channels.propTypes = {
    channels: PropTypes.array,
    onClick: PropTypes.func.isRequired,
}
