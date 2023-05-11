const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

// new
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/new', (req, res) => {
  const { name } = req.body
  const UserId = req.user.id
  return Todo.create({ UserId, name })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const { name, isDone } = req.body
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.log(err))
})

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.destroy({ where: { id, UserId } })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router