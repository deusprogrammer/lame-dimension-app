import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import authConfig from '../config/authConfig.js';

import Users from '../models/user.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    const user = await Users.findOne({ username: req.body.username });
    if (!user || !(await user.isValidPassword(req.body.password))) {
        res.statusCode = 401;
        return res.send();
    }

    const body = {
        _id: user._id,
        username: user.username,
        roles: user.roles,
    };
    const jwtToken = jsonwebtoken.sign({ user: body }, authConfig.key);

    return res.json({
        jwtToken,
    });
});

export default router;
