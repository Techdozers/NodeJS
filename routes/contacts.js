var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Areee OO Samba...  User contacts' });
});

module.exports = router;
