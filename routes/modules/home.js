const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', (req, res) => {
  const userId = req.user.id
  return Todo.findAll({ where: { userId }, raw: true, nest: true })
    .then(todos => {
      return res.render('index', { todos: todos })
    })
    .catch(err => {
      return res.status(422).json(err)
    })
  // 搜尋全部資料的寫法如下
  // return Todo.findAll({
  //   raw: true,
  //   nest: true
  // })
  //   .then(todos => { return res.render('index', { todos: todos }) })
  //   .catch(err => { return res.status(422).json(err) })
})


module.exports = router