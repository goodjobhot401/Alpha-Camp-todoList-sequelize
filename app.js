const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const usePassport = require('./config/passport')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

// view engine
app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// bodyparse
app.use(express.urlencoded({ extended: true }))
// method-override
app.use(methodOverride('_method'))
// session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// passport
usePassport(app)
// flash() message
app.use(flash())
// middleware 
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated() // 檢測是否通過認證
  res.locals.user = req.user  // 將認證通過獲得的 user 資料, 傳至 req.user 讓路由器使用
  res.locals.success_msg = req.flash('success_msg') // 設定 success 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning 訊息
  next()
})
// router
app.use(routes)


// listen
app.listen(port, () => {
  console.log(`Website is listened on http://localhost:${port}`)
})