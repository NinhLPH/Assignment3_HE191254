require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const router = require('./router/router.js');

const app = express();

app.use('/api', router);

app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Invalid JSON request body' });
    }

    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
