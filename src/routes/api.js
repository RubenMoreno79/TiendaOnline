const { checkToken } = require('../helpers/midleware');

const router = require('express').Router();

router.use('/products', checkToken, require('./api/products'));
router.use('/users', require('./api/users'));


module.exports = router