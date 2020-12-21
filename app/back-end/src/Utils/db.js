const {v4: uuid} = require('uuid');
const {clone, merge} = require('mixme');
const microtime = require('microtime');
const level = require('level');
const db = level(__dirname + '/../../db');

module.exports = {
    channels: {
        create: async (channel) => {
            if (!channel.title) throw Error('Invalid channel');
            const id = uuid();
            await db.put(`channels:${id}`, JSON.stringify(channel));

            return merge(channel, {id: id});
        },
        get: async (id) => {
            if (!id) throw Error('Invalid id');
            const data = await db.get(`channels:${id}`);
            const channel = JSON.parse(data);

            return merge(channel, {id: id});
        },
        list: async () => {
            return new Promise((resolve, reject) => {
                const channels = [];
                db.createReadStream({
                    gt: "channels:",
                    lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
                }).on('data', ({key, value}) => {
                    channel = JSON.parse(value);
                    channel.id = key.split(':')[1];
                    channels.push(channel);
                }).on('error', (err) => {
                    reject(err);
                }).on('end', () => {
                    resolve(channels);
                });
            });
        },
        update: async (original, channel) => {
            if (!original) throw Error('Unregistered user id');

            const newChannel = merge(original, channel);
            const {id} = newChannel;
            const {title, creator, channelUsers} = newChannel;

            await db.put(`channels:${id}`, JSON.stringify({title, creator, channelUsers}));

            return newChannel;

        },
        delete: async (channel) => {
            await db.del(`channels:${channel.id}`);
        }
    },
    messages: {
        create: async (channel, user, content) => {
            if (!channel) throw Error('Invalid channel');
            if (!user) throw Error('Invalid message');
            if (!content) throw Error('Invalid message');

            const creation = microtime.now();
            const id = uuid();

            await db.put(`messages:${id}`, JSON.stringify({channel, user, content, creation}));

            return merge({channel, user, content, creation}, {id: id});
        },
        get: async (id) => {
            if (!id) throw Error('Invalid id');

            const data = await db.get(`messages:${id}`);
            const message = JSON.parse(data);

            return merge(message, {id: id});
        },
        list: async () => {
            return new Promise((resolve, reject) => {
                const messages = [];
                db.createReadStream({
                    gt: `messages:`,
                    lte: `messages` + String.fromCharCode(":".charCodeAt(0) + 1),
                }).on('data', ({key, value}) => {
                    message = JSON.parse(value);
                    message.id = key.split(':')[1];
                    messages.push(message);
                }).on('error', (err) => {
                    reject(err);
                }).on('end', () => {
                    resolve(messages);
                });
            });
        },
        update: async (original, message) => {
            if (!original) throw Error('Unregistered user id');

            const newMessage = merge(original, message);

            const {id} = newMessage;
            const {channel, user, content, creation} = newMessage;

            await db.put(`messages:${id}`, JSON.stringify({channel, user, content, creation}));

            return newMessage;
        },
        delete: async (message) => {
            await db.del(`messages:${message.id}`);
        }
    },
    users: {
        create: async (user) => {
            if (!user.email) throw Error('Invalid user');

            const id = uuid();
            await db.put(`users:${id}`, JSON.stringify(user));

            return merge(user, {id: id});
        },
        get: async (id) => {
            if (!id) throw Error('Invalid id');

            const data = await db.get(`users:${id}`);
            const user = JSON.parse(data);

            return merge(user, {id: id});
        },
        list: async () => {
            return new Promise((resolve, reject) => {
                const users = [];
                db.createReadStream({
                    gt: "users:",
                    lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
                }).on('data', ({key, value}) => {
                    user = JSON.parse(value);
                    user.id = key.split(':')[1];
                    users.push(user);
                }).on('error', (err) => {
                    reject(err);
                }).on('end', () => {
                    resolve(users);
                });
            });
        },
        update: async (original, user) => {
            if (!original) throw Error('Unregistered user id');

            const newUser = merge(original, user);
            const {id} = newUser;
            const {fullName, email, password, role, fileName, filePath} = newUser;

            await db.put(`users:${id}`, JSON.stringify({fullName, email, password, role, fileName, filePath}));

            return newUser;
        },
        delete: async (user) => {
            await db.del(`users:${user.id}`);
        }
    },
    admin: {
        clear: async () => {
            await db.clear();
        }
    }
}