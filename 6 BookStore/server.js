const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');


const app = express();
connectDB();


app.use(express.json());
app.use('/api/mybooks', bookRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));