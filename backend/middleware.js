const jwt = require('jsonwebtoken');
const { JWT_PASSWORD } = require('./config');
const authMiddleware = (req, res, next) => {

    const validTokenOrNot = (token) => {
        try{
            const verification = jwt.verify(token, JWT_PASSWORD)
            req.headers.userId = verification.userId
            return true
        }
        catch{
            return false
        }
    }

    const requestAuthorizationHeader = req.headers.authorization
    if (requestAuthorizationHeader.split(" ")[0]=="Bearer" && validTokenOrNot(requestAuthorizationHeader.split(" ")[1])){
        next()
    }
    else{
        return res.status(403).json({})
    }
}

module.exports = authMiddleware