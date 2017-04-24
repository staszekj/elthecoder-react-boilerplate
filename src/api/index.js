const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('You must be more specific what api you want to call :-]')
});

router.post('/sendEmail', function(req, res) {
  const resObj = {
    status: 'ERROR',
    message: 'NOT_IMPLEMENTED'
  };

  console.log('SERVER: Sending response', resObj);
  res.send(resObj)
});

module.exports = router;