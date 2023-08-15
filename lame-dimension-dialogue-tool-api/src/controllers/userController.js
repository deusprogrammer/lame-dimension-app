import Users from '../models/user.js';
import Codes from '../models/codes.js';
import { checkRoles } from '../helpers/SecurityHelper.js';

export default {
    getUsers: (req, res) => {
        Users.find({}, (error, results) => {
            if (error) {
                res.status(400);
                return res.send(error);
            }

            res.json(results);
            return res.send();
        });
    },
    getUser: (req, res) => {
        Users.findById(req.params.id, (error, result) => {
            if (error) {
                res.status(400);
                return res.send(error);
            }

            if (result === null) {
                res.status(404);
                return res.send('User not found');
            }

            res.json(result);
            return res.send();
        });
    },
    getSelf: (req, res) => {
        Users.findOne({ username: req.user.username }, (error, result) => {
            if (error) {
                res.status(400);
                return res.send(error);
            }

            if (result === null) {
                res.status(404);
                return res.send('User not found');
            }

            res.json(result);
            return res.send();
        });
    },
    createUser: async (req, res) => {
        req.body.roles = ['EDITOR'];

        let { code } = req.body;

        let found = await Codes.findOne({ code });

        if (!found) {
            res.statusCode = 403;
            return res.send();
        }

        delete req.body.code;

        try {
            let result = await Users.create(req.body);
            await Codes.deleteOne({ code });

            res.json(result);
            return res.send();
        } catch (error) {
            res.status(400);
            return res.send(error);
        }
    },
    updateUser: async (req, res) => {
        let user = await Users.findOne({ username: req.user.username });
        let { password, roles } = req.body;

        let isAdmin = checkRoles(req, 'ADMIN');

        // If the caller doesn't own this user and they aren't an admin, fail
        if (user.username !== req.params.id && !isAdmin) {
            res.statusCode = 403;
            return res.send();
        }

        // If the role isn't admin, then clear changes to roles
        if (!isAdmin) {
            req.params.roles = user.roles;
        }

        if (password) {
            user.password = password;
            user.save();
        } else {
            await Users.updateOne({ username: req.params.id }, req.body);
        }

        return res.send();
    },
    deleteUser: async (req, res) => {
        if (!checkRoles(req, 'ADMIN')) {
            res.status(403);
            return res.send();
        }
        await Users.deleteOne({ username: req.params.id });
        return res.send();
    },
};
