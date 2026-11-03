const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authorization = req.get('Authorization');
    // Support the task's Bearer<token> format and the standard Bearer <token>.
    const match = authorization && authorization.match(/^Bearer\s*(\S+)$/i);

    if (!match) {
        return res.status(401).json({ message: 'Missing or invalid authorization token' });
    }

    try {
        req.user = jwt.verify(match[1], process.env.JWT_SECRET, {
            algorithms: ['HS256']
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    return next();
};

module.exports = verifyToken;
