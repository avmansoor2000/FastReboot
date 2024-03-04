const jwt = require('jsonwebtoken');
require('dotenv').config()

// Function to generate JWT token
exports.generateToken = (userId) => {
    const secret_key = process.env.USER_JWT_KEY;
    console.log(secret_key);
    return jwt.sign({ userId }, secret_key , { expiresIn: '1h' }); 
};

// Middleware to authenticate requests using JWT token
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.USER_JWT_KEY;
        console.log(secretKey, 'ssssssssssssssssssss');

        const decoded = jwt.verify(token, secretKey);
        console.log("Token Decoded Successfully");

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token.' });
    }
};


// Route to invalidate a token (logout)
exports.invalidateToken = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    invalidatedTokens.add(token);
    res.json({ message: 'Token invalidated successfully.' });
};
