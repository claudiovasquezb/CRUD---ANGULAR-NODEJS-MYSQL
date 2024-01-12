const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/connection');


const app = express();

// DB Connection
dbConnection();

// CORS
app.use(cors());

app.use(express.json());

// ROUTES
app.use('/api/notes', require('./routes/notes'));


app.listen(process.env.PORT, () => {
    console.log(`Server on port ${ process.env.PORT }`);
});