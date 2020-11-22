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
      const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
      res.status(201).json({ data, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

exports.loginUser = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findByCredentials(email, password);
      if (!user) {
        return res.status(401).json({ error: "Login failed! Check authentication credentials" });
      }
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };