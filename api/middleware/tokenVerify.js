const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const tokenVerify = (authorization, req) => {    
    if (authorization) {
        const token = authorization.split(" ")[1];
        if (token && token.length > 8) {
            const user = jwt.verify(token, jwt_secret);
            req.body.id = user.id;
            req.userid = user.id;
        }
    }
}

module.exports = tokenVerify;