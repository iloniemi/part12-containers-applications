const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const cache = require('../redis/index');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const postCount = await cache.getAsync('added_todos');
  const newPostCount = postCount
    ? Number(postCount)+1
    : 1
  await cache.setAsync('added_todos', newPostCount);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const _id = req.todo._id
  const update = req.body;
  await Todo.findOneAndUpdate({ _id }, update);
  const updatedTodo = await Todo.findById(_id);
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
