const db = require("../Utils/db");
const {compare} = require('../Utils/index');

// @desc   Add message
// @route  POST /api/v1/channels/messages
exports.addMessage = async (req, res) => {
    try {
        const {channel, user, content} = req.body;
        const newMessage = await db.messages.create(channel, user, content);

        return res.status(200).send(newMessage);

    } catch (e) {
        return res.status(500).json('Server error');
    }
}

// @desc   Get messages of a user
// @route  GET /api/v1/messages/users/:id
exports.getMessages = async (req, res) => {
    try {
        const messages = await db.messages.list();
        messages.sort(compare);

        return res.status(200).send(messages);

    } catch (e) {
        return res.status(500).json('Server error');
    }
}

// @desc   Update message
// @route  PUT /api/v1/messages/:id
exports.updateMessage = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;

        const message = await db.messages.get(id);
        const newMessage = await db.messages.update(message, data);

        return res.status(200).send(newMessage);

    } catch (e) {
        return res.status(500).json('Server error');
    }
}

// @desc   Delete message
// @route  DELETE /api/v1/messages/:id
exports.deleteMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const message = await db.messages.get(id);

        await db.messages.delete(message);

        return res.status(200).json('Message deleted');

    } catch (e) {
        return res.status(500).send('Server error');
    }
}