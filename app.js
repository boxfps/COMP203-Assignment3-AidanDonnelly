const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const todolistRouter = require('./routes/todolist');
const todoInputRouter = require('./routes/todo-input'); // New route
const db = require('./db'); // MySQL database connection

const app = express();

// Middleware
app.use(logger('dev')); // Logs HTTP requests
app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded requests
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files

// Routes
app.use('/', indexRouter); // Default routes
app.use('/todo', todolistRouter); // Todo list routes
app.use('/', todoInputRouter); // Add Todo input page route

// Error Handling
// Catch 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Global error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page or send a JSON response
  res.status(err.status || 500);
  res.json({ error: res.locals.message });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
