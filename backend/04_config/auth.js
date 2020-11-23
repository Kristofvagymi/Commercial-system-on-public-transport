const jwt = require("jsonwebtoken");
const config = require("./db.config");

exports.loggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, config.secret);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed"
    });
  }
};

exports.commercial_admin = async function (req, res, next) {
    if( !req.user.role === 'commercial_admin' ){
        return res.status(401).send("Access Denied");
    }  
    next();
}

exports.transport_admin = async function (req, res, next) {
    if( !req.user.role === 'transport_admin' ){
        return res.status(401).send("Access Denied");
    }  
    next();
}

exports.service = async function (req, res, next) {
  if( !req.user.role === 'service' ){
      return res.status(401).send("Access Denied");
  }  
  next();
}