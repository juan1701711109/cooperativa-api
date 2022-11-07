const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const conexion_db = require('./config/conexion_db');  

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const mysql = require('mysql');
const datos = require('./config/conexion_db');

const conexion = mysql.createConnection(datos);

//Rutas
const routerRoles = require('./routes/rolesController');
app.use('/api/roles', routerRoles);

const routerUsuarios = require('./routes/usuariosController');
app.use('/api/usuarios', routerUsuarios);

conexion.connect((err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Conectado');
  }
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
