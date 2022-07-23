const router = require('express').Router();

router.route('/').get((req, res) => {
  res.render('about');
});

module.exports = router;