import express from 'express';
import { randomUUID } from 'crypto';
import characters from '../data/characters.js';
import chapters from '../data/chapters.js';
const router = express.Router();

//recursively remove _id fields
function cleanId(obj) {
    if (Array.isArray(obj)) obj.forEach(cleanId);
    else {
        delete obj['_id'];
        for (let key in obj) if (typeof obj[key] == 'object') cleanId(obj[key]);
    }

    return obj;
}

router.post('/', async function (req, res, next) {
    if (!req.user.roles.includes('ADMIN')) {
        req.statusCode = 403;
        return res.send();
    }
    req.body.editor = 'root';
    req.body.id = randomUUID();
    return res.json(req.body);
});

router.get('/', async function (req, res, next) {
    return res.json([{chapters, characters, id: 1, name: 'Script', editor: 'Test'}]);
});

router.get('/:id', async function (req, res, next) {
    return res.json({chapters, characters, id: 1, name: 'Script', editor: 'Test'});
});

router.put('/:id', async function (req, res, next) {
    return res.json(req.body);
});

export default router;
