const express = require('express');
const router = express.Router();

const configs = require('../util/config');
const req = require('express/lib/request');
const cache = require('../redis');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  let todoCount = await cache.getAsync('added_todos');
  if (!todoCount) todoCount = 0;
  res.json({
    added_todos: todoCount
  });
});

module.exports = router;
