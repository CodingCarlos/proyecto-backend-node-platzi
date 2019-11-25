const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');

const app = express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');

// ROUER
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});