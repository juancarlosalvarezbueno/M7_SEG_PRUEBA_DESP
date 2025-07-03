const express =require('express');
const helmet = require('helmet');
const db = require('./models');

const app = express();

app.use(express.json());
app.use(helmet()); 


app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

    module.exports = app; 