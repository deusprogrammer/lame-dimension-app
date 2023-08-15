import Users from '../models/user.js';

export const checkRoles = async (req, role) => {
    let username = req.user.username;
    let user = await Users.findOne({username});

    return user.roles.includes(role);
}