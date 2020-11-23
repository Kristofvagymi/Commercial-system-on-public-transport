const User = require("../03_models/User");

exports.createUser = async (req, res) => {
    try {
      await User.findOne({username: req.body.username}).then((user) => {
        if(user){
          throw new Error({ error: "User exists with given username." });
        }
      })
      
      const user = new User(req.body);

      let data = await user.save();
      res.status(201).json({ data });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

exports.loginUser = async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const user = await User.findByCredentials(username, password);
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(401).json({ err: err });
    }
  };

exports.blockUserByName = async (req, res) => {
  try{
    User.findOne({username: req.body.username}).then((user) => {
      if(!user){
        throw new Error({ error: "User exists with given username." });
      }
      user.blocked = true;
      user.save();
    })
  } catch (err) {
    res.status(400).json({ err: err });
  }
}

exports.enableUserByName = async (req, res) => {
  try{
    User.findOne({username: req.body.username}).then((user) => {
      if(!user){
        throw new Error({ error: "User exists with given username." });
      }
      user.blocked = false;
      user.save();
    })
  } catch (err) {
    res.status(400).json({ err: err });
  }
}

exports.enableUserByName = async (req, res) => {
  try{
    User.findOne({username: req.body.username}).then((user) => {
      if(!user){
        throw new Error({ error: "User exists with given username." });
      }
      user.blocked = false;
      user.save();
    })
  } catch (err) {
    res.status(400).json({ err: err });
  }
}


exports.getUsers = async (req, res) => {
  try{
    User.find({blockable: true}).then((users) => {
      res.json({ users: users });
    })
  } catch (err) {
    res.status(400).json({ err: err });
  }
}