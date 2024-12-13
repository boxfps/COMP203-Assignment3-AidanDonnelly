var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome to the Todo App', description: 'Click below to go to the Todo List input page.', link: '/todo-input' });
});

module.exports = router;
