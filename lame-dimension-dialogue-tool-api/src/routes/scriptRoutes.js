import express from 'express';
import { checkRoles } from '../helpers/SecurityHelper.js';
import Scripts from '../models/script.js';
import { randomUUID } from 'crypto';
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
    if (!checkRoles(req, 'ADMIN')) {
        req.statusCode = 403;
        return res.send();
    }
    req.body.editor = 'root';
    req.body.id = randomUUID();
    let script = await Scripts.create(req.body);
    res.json(script);
    return res.send();
});

router.get('/', async function (req, res, next) {
    if (!checkRoles(req, 'EDITOR')) {
        req.statusCode = 403;
        return res.send();
    }

    let scripts = await Scripts.find({});

    res.json(scripts);
    return res.send();
});

router.get('/:id', async function (req, res, next) {
    let { pull } = req.query;
    let { id } = req.params;

    if (!checkRoles(req, 'EDITOR')) {
        req.statusCode = 403;
        return res.send();
    }

    try {
        if (pull) {
            let script = await Scripts.findOne({ id, editor: pull });

            if (!script) {
                throw {
                    statusCode: 404,
                };
            }

            return res.json(script);
        }

        let script = await Scripts.findOne({ id, editor: req.user.username });

        // If there isn't a copy of the current script, then get it and store it for this editor
        if (!script) {
            script = await Scripts.findOne({ id, editor: 'root' });

            if (!script) {
                throw {
                    statusCode: 404,
                };
            }

            script = cleanId(script.toObject());
            script.editor = req.user.username;
            let newScript = new Scripts(script);
            await newScript.save();
            script = newScript;
        }

        res.json(script);
        return res.send();
    } catch (e) {
        console.error(e);
        res.statusCode = e.statusCode || 500;
        return res.send();
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        let { merge } = req.query;
        let { id } = req.params;

        if (!checkRoles(req, 'EDITOR')) {
            req.statusCode = 403;
            return res.send();
        }

        // If admin and merge is passed, overwrite what's in root.
        if (merge === '' || (merge && checkRoles(req, 'ADMIN'))) {
            let script = await Scripts.findOne({
                id,
                editor: req.user.username,
            });
            if (!script) {
                throw new {
                    statusCode: 404,
                }();
            }

            await Scripts.updateOne({ id, editor: 'root' }, req.body);
            script.editor = 'root';
            return res.json(script);
        }

        let script = await Scripts.findOne({ id, editor: req.user.username });

        // If there isn't a copy of the current script, then get it and store it for this editor
        if (!script) {
            throw {
                statusCode: 404,
            };
        }

        await script.updateOne({ ...req.body, editor: req.user.username });

        res.json(script);
        return res.send();
    } catch (e) {
        res.statusCode = e.statusCode || 500;
        return res.send();
    }
});

export default router;
