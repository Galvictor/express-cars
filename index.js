const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const carsRoute = require('./routes/cars');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Conectado ao banco!'));

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/cars', carsRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor Rodando na porta ${port}`));
