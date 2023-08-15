const users = {
  test1: {
    username: "test1",
    roles: [],
  },
  test2: {
    username: "test2",
    roles: [],
  },
  test3: {
    username: "test3",
    roles: ["EDITOR"],
  },
  test4: {
    username: "test4",
    roles: ["ADMIN"],
  },
};

export default {
  getUsers: (req, res) => {
    res.json(Object.values(users));
    return res.send();
  },
  getUser: (req, res) => {
    res.json(users[req.params.id]);
    return res.send();
  },
  getSelf: (req, res) => {
    res.json(users["test4"]);
    return res.send();
  },
  createUser: (req, res) => {
    users[req.body.username] = req.body;
    res.json(req.body);
    return res.send();
  },
  updateUser: (req, res) => {
    users[req.params.id] = req.body;
    res.json(req.body);
    return res.send();
  },
  deleteUser: (req, res) => {
    delete users[req.params.id];
    res.json(Object.values(users));
    return res.send();
  },
};
