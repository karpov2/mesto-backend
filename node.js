const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const limiter = require('./middleware/limiter');
const router = require('./routes/routes');
const config = require('./config');

mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
        console.info('Database connected');

        const app = express();
        app.use(limiter);
        app.use(helmet());
        app.use(cookieParser()); // подключаем парсер кук как мидлвэр
        app.use(bodyParser.json()); // parse application/json
        app.use(router);

        app.listen(config.PORT, () => {
            console.info(`App listening on port ${config.PORT}`);
            console.info(`Mode ${process.env.NODE_ENV}`);
            console.info(`config.DATABASE ${config.DATABASE}`);
        });
    })
    .catch((error) => {
        console.error('Database connected Error: ', error);
    });
