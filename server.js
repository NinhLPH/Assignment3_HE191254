const app = require('./app.js');
const connectDB = require('./config/db.js');

connectDB().then(() => {
    const PORT = process.env.PORT || 9999;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
