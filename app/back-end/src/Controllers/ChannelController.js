const db = require("../Utils/db");

// @desc   Add channel
// @route  POST /api/v1/channels
exports.addChannel = async (req, res) => {
    try {
        const data = req.body;
        const newChannel = await db.channels.create(data);
        return res.status(200).send(newChannel);

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Get channels
// @route  GET /api/v1/channels
exports.getChannels = async (req, res) => {
    try {
        const channels = await db.channels.list();
        return res.status(200).json(channels);

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Get channel
// @route  GET /api/v1/channels/:id
exports.getChannel = async (req, res) => {
    try {
        const id = req.params.id;
        const channel = await db.channels.get(id);
        if (!channel) {
            return res.status(404).send('Channel does not exist');
        }
        return res.status(200).send(channel);

    } catch (e) {
        return res.status(500).send('Server error')
    }
}

// @desc   Update channel
// @route  PUT /api/v1/channels/:id
exports.updateChannel = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;

        const channel = await db.channels.get(id);
        const newChannel = await db.channels.update(channel, data);

        return res.status(200).send(newChannel);

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Delete channel
// @route  DELETE /api/v1/channels/:id
exports.deleteChannel = async (req, res) => {
    try {
        const id = req.params.id;

        const channel = await db.channels.get(id);
        await db.channels.delete(channel);

        return res.status(200).json('Channel has been deleted');

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

