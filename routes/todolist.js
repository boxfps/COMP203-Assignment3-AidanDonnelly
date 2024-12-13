var express = require('express');
const connection = require('../db');
var router = express.Router();

// Route to get all todos
router.get('/', (req, res) => {
    res.send('Get all todos');
    const query = 'SELECT * FROM todo_list';
    connection.query(query, (err, results)=> {
        if (err) 
        {
            return res.status(500).json({message: err.message})
        }
    })
});

// Route to get a specific todo by ID
router.get('/:id', (req, res) => {
    res.send(`Get todo with ID: ${req.params.id}`);
});

// Route to update a specific todo by ID
router.put('/:id', (req, res) => {
    res.send(`Update todo with ID: ${req.params.id}`);
});

// Route to delete a specific todo by ID
router.delete('/:id', (req, res) => {
    res.send(`Delete todo with ID: ${req.params.id}`);
});

// Corrected POST route to create a new todo
router.post('/', (req, res) => {
    // You can access request body data like req.body.description if needed
    res.send('Post new todo');
});

module.exports = router;
