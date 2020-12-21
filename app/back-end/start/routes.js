const express = require('express');
const router = express.Router();

const {signUp, signIn, logout, getMe} = require('../src/Controllers/AuthController');
const {getUsers, getUser, updateUser, deleteUser, uploadFile} = require('../src/Controllers/UserController');
const {addChannel, getChannels, getChannel, updateChannel, deleteChannel} = require('../src/Controllers/ChannelController');
const {addMessage, getMessages, updateMessage, deleteMessage} = require('../src/Controllers/MessageController');

// Middlewares
const {ensureAuth} = require('../src/Middleware/auth');
const {permit} = require('../src/Middleware/RoleAccess');

// Register
router.post('/register', signUp);

// Login
router.post('/login', signIn);

// Logout
router.get('/logout', logout);

// Me
router.get('/me', getMe);

// User
router.get('/users', ensureAuth, getUsers);
router.get('/users/:id', ensureAuth, getUser);
router.put('/users/:id', ensureAuth, permit('ROLE_USER', 'ROLE_ADMIN'), updateUser);
router.delete('/users/:id', ensureAuth, permit('ROLE_ADMIN'), deleteUser);

// File Upload User
router.post('/upload', uploadFile);

// Channel
router.get('/channels', ensureAuth, getChannels);
router.get('/channels/:id', ensureAuth, getChannel);
router.post('/channels', ensureAuth, addChannel);
router.put('/channels/:id', ensureAuth, updateChannel);
router.delete('/channels/:id', ensureAuth, deleteChannel);

// Message
router.get('/messages', ensureAuth, getMessages);
router.post('/messages', ensureAuth, addMessage);
router.put('/messages/:id', ensureAuth, updateMessage);
router.delete('/messages/:id', ensureAuth, deleteMessage);


module.exports = router;