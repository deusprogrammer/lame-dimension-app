import Users from '../models/user.js';

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
                return res.send(error);;
            }

            if (result === null) {
                res.status(404);
                return res.send('User not found');
            }

            res.json(result);
            return res.send();
        });
    },
    createUser: (req, res) => {
        req.body.roles = [];
        Users.create(req.body, (error, result) => {
            if (error) {
                res.status(400);
                return res.send(error);
            }

            res.json(result);
            return res.send();
        });
    },
    updateUser: async (req, res) => {
        if (!req.user.roles.includes('ADMIN')) {
            res.status(403);
            return res.send();
        }
        await Users.updateOne({username: req.params.id}, req.body);
        res.json(req.body);
        return res.send();
    },
    deleteUser: async (req, res) => {
        if (!req.user.roles.includes('ADMIN')) {
            res.status(403);
            return res.send();
        }
        await Users.deleteOne({username: req.params.id});
        return res.send();
    }
};
