const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    status: 200,
    errors: null,
    data: 'Welcome to Express Core API'
  });
});

module.exports = router;
