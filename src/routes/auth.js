import { Router } from "express";
import Room from '../../db/models/rooms.js';
import User from '../../db/models/users.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({
            status: "fail",
            message: "Register requires both username and password",
        });
    }
    const checkUsername = User.find({ username });

    try {
        const user = await checkUsername.clone().exec();
        if (user.length > 0) {
            return res.status(403).json({ message: "ID Already Exists" });
        }
    } catch (err) {
        return res.status(402).json({ message: err })
    }

    User.create({
        username,
        password,
    }).then(result => {
        res.json(result)
    }).catch( err => {
        return res.status(402).json({ message: err })
    })
    
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const checkUsername = User.findOneAndUpdate({ username, password }, { status: true });

    const user = await checkUsername.clone().exec();
    if (user) {
        return res.json(user);
    } else {
        res.status(403).json({ message: "invalid username and password"})
    }
})

router.post('/logout', async (req, res) => {
    const { username } = req.body;
    User.findOneAndUpdate({ username }, { status: false }).clone().exec();
})

export default router;