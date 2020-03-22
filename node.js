require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.info('Database connected');

    const app = express();
    app.use(cookieParser()); // подключаем парсер кук как мидлвэр
    app.use(bodyParser.json()); // parse application/json
    app.use(router);

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
})
.catch(error => {
    console.error('Database connected Error: ', error);
});
