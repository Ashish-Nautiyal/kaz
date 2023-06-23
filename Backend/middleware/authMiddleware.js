const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send("Access Denied");
    try {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Invalid Token.");
    }
}

module.exports = authMiddleware;