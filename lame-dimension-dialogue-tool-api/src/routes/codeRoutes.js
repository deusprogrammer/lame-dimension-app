import express from 'express';
import Codes from '../models/codes.js';
import { randomUUID } from 'crypto';
import { checkRoles } from '../helpers/SecurityHelper.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
    if (!checkRoles(req, 'ADMIN')) {
        res.statusCode = 403;
        return res.send();
    }

    await Codes.create({
        code: randomUUID(),
    });

    return res.send();
});

router.route('/').get(async (req, res) => {
    if (!checkRoles(req, 'ADMIN')) {
        res.statusCode = 403;
        return res.send();
    }

    let codes = await Codes.find({});

    res.json(codes);
    return res.send();
});

export default router;
