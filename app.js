const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const config = require('./util/cfg');
const userRoutes = require('./routes/user');

const cfg = config.config;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRoutes);

sequelize.sync()
    .then(result => {
        app.listen(cfg.serverPort);
        console.log(`Server listening on port ${cfg.serverPort}`)
    })
    .catch(err => console.log(err));