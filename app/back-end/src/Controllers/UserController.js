const db = require("../Utils/db");
const {v4: uuid} = require('uuid');

// @desc   Get users
// @route  GET /api/v1/users
exports.getUsers = async (req, res) => {
    try {
        const users = await db.users.list();
        return res.status(200).send(users);

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Get user
// @route  GET /api/v1/users/:id
exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await db.users.get(id);

        if (!user) {
            return res.status(404).send('User does not exist');
        }

        return res.status(200).send(user);

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Update user
// @route  PUT /api/v1/users/:id
exports.updateUser = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;

        const user = await db.users.get(id);
        const newUser = await db.users.update(user, data);

        return res.status(200).send(newUser);

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Delete user
// @route  DELETE /api/v1/message/:id
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await db.users.get(id);
        await db.users.delete(user);

        return res.status(200).json('User deleted');

    } catch (e) {
        return res.status(500).send('Server error');
    }
}

// @desc   Upload file
// @route  POST /api/v1/upload
exports.uploadFile = (req, res) => {
    if (req.files === null) {
        return res.status(400).json('No file uploaded');
    }

    const file = req.files.file;

    // Set unique name to fileupload
    const filename = uuid();

    file.mv(`${__dirname}/../../../front-end/public/uploads/${filename}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({
            fileName: file.name,
            filePath: `/uploads/${filename}`
        });
    });

}