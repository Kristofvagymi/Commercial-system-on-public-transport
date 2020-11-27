const User = require("../03_models/User");

exports.createUser = async (req, res) => {
    try {
      await User.findOne({username: req.body.username}).then((user) => {
        if(user){
          throw new Error({ error: "User exists with given username." });
        }
      })
      
      const user = new User(req.body);
      user.role = 'advertiser'
      user.money = 0
      user.blockable = true

      let data = await user.save();
      res.status(201).json({ data });
    } catch (err) {
        res.status(400).json({ error: err });
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
      res.status(200).json({ blocked: req.body.username });
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
      res.status(200).json({ enabled: req.body.username });
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

exports.uploadMoney = async (req, res) => {
  try{
    let user = req.user
    let amount = req.body.amount
    if(amount < 0)
      throw new Error("Amount must be greater than zero.")

    User.findOne({username: user.username}).then((user) => {
      if(! user) { throw new Error("User not found."); }
      user.money += amount;
      user.save();
      res.status(200).json({ msg: `Money added:${amount}` });
    })
  } catch (err) {
    res.status(400).json({ err: err });
  }
}

