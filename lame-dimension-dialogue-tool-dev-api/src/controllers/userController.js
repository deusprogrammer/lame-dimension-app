export default {
  getUsers: (req, res) => {
    return res.json([]);
  },
  getUser: (req, res) => {
    return res.json({
      username: "test",
      roles: ["ADMIN"],
    });
  },
  getSelf: (req, res) => {
    return res.json({
      username: "test",
      roles: ["ADMIN"],
    });
  },
  createUser: (req, res) => {
    return res.json(req.body);
  },
};
