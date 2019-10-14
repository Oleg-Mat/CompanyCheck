// Фреймворк веб-приложений.
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// HTTP request logger middleware for node.js.
// Логгирование деталей запросов.
const morgan = require("morgan");
app.use(morgan("dev"));

//Cookies + sessions
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Redis for sessions
const redis   = require("redis");
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();

// Обработка POST запросов (вместо импорта body parser).
// urlencoded.
app.use(express.urlencoded({extended: true}));
// json.
app.use(express.json());

//DB connect
mongoose.connect('mongodb://localhost/Elbr', {useNewUrlParser: true});

// Импорт маршрутов.
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users/users");
const channelsRouter = require("./routes/channels");

// Use cookies
app.use(cookieParser());

// Adds sessions handling
app.use(session({
  store: new RedisStore({ 
    client,
    host: 'localhost', 
    port: 6379, 
    ttl :  3000
  }),
  key: 'user_sid',
  secret: 'cylinder',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

// Подключаем статику
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем views(hbs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/channels', channelsRouter);

// Обработка ошибок.
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
