import { Router } from "express";
import Room from '../../db/models/rooms.js';
import User from '../../db/models/users.js';

const router = Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const user = new User({
        
    });
})

router.post('/login', (req, res) => {
    const user = new User();
})

router

export default router;