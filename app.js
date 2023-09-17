require('dotenv').config();
require('express-async-errors');
const express = require('express');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandlers');
const mainRouter = require('./routes/route');
const app = express();


const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(notFound);
app.use(errorHandler);

const start = async() => {
    try{
       
        app.listen(PORT, console.log(`Server listening on port ${PORT}...`));

    }catch(err){
        console.log(err);
    }
}

start();