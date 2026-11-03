const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || typeof password !== 'string' ||
        !email || !password || email !== 'HE191254@fpt.edu.vn' ||
        password !== 'HE191254@123') {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    try {
        const payload = JSON.parse({"email":"HE191254@fpt.edu.vn"});
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1h'
        });

        return res.json({ message: 'Login successful', token });
    } catch (error) {
        return next(error);
    }
};

module.exports = { login };
