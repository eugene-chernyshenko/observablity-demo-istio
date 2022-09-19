var express = require('express');
var router = express.Router();

const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
})

router.get('/', function(req, res, next) {
  res.send({status: 'ok'});
});

router.get('/ok', function(req, res, next) {
  logger.info('/ok - requested');
  res.send({status: 'ok'});
});

router.get('/fail', function(req, res, next) {
  logger.info('/fail - requested');
  if (process.env.DO_FAIL === "1") {
    res.status(500);
    res.send({status: 'fail'});
  } else {
    res.send({status: 'ok'});
  }
});

module.exports = router;
