// const { error } = require('console');
const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    //check if req header has token or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'header does not have token'});
    
    // Extract jwt token from req header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'token not found'});

    try {
        //verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //attach user info to req obj;
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'invalid token'});
    }
}

//function to generate jwt token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}
module.exports = {jwtAuthMiddleware, generateToken};