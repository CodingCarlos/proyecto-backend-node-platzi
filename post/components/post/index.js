const store = require('../../../store/mysql');
const ctrl = require('./controller');

module.exports = ctrl(store);