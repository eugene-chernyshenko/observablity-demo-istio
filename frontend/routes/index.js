const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

const BACKEND_HOST = process.env.BACKEND_HOST || '127.0.0.1'
const BACKEND_PORT = process.env.BACKEND_PORT || '3001'

const winston = require('winston');
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
})

router.get('/', function(req, res, next) {
  res.send({status: 'ok'});
});

router.get('/ok', function(req, res, next) {
  logger.info('/ok - requested');
  axios.get(`http://${BACKEND_HOST}:${BACKEND_PORT}/ok`)
    .then(r => res.send(r.data))
    .catch(r => {
      res.sendStatus(r.response.status)
      res.send(r.data);
    })
});

router.get('/fail', function(req, res, next) {
  logger.info('/fail requested');
  axios.get(`http://${BACKEND_HOST}:${BACKEND_PORT}/fail`)
    .then(r => res.send(r.data))
    .catch(r => {
      res.sendStatus(r.response.status)
      res.send(r.data);
    })
});

module.exports = router;
