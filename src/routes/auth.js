import { Router } from "express";
import Room from '../../db/models/rooms.js';
import User from '../../db/models/users.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const checkUsername = User.find({ username });
    const createUser = User.create({
        username,
        password,
    });

    try {
        const user = await checkUsername.clone().exec();
        if (user.length > 0) {
            return res.json({ message: "ID Already Exists" });
        }
    } catch (err) {
        return res.status(402).json({ message: err })
    }

    try {
        const res = await createUser.clone().exec();
        return res.json(res);
    } catch (err) {
        res.status(402).json({ message: err })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const checkUsername = User.findOneAndUpdate({ username, password }, { status: true });

    const user = await checkUsername.clone().exec();
    if (user) {
        res.json(user[0]);
    } else {
        res.status(403).json({ message: "invalid username and password"})
    }
})

router.get('/logout', async (req, res) => {
    const { username } = req.body;
    const checkUsername = User.findOneAndUpdate({ username }, { status: false });

    const user = await checkUsername.clone().exec();
})

export default router;