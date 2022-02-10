const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const headerToken = req.headers.token;

  if (headerToken) {
    const token = headerToken.split(" ")[1];
    JWT.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("user not authenticatied!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("yout not allow do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("yout not allow do that!");
      }
    });
  };

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};
