var express = require('express');
var router = express.Router();

/* GET Todo input page. */
router.get('/todo-input', function(req, res, next) {
    res.render('todo-input', { title: 'Todo List Input' });
});

module.exports = router;
