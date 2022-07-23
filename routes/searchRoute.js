const { getSearchedProduct } = require('../controllers/searchProducts');
const router = require('express').Router();

router.route('/').get( getSearchedProduct );

module.exports = router;