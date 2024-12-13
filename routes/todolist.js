const express = require('express');
const connection = require('../db');
const router = express.Router();

// Route to get all todos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM todo_items'; // Corrected table name
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// Route to get a specific todo by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM todo_items WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(results[0]);
    });
});

// Route to create a new todo
router.post('/', (req, res) => {
    const { description, completed_ts, updated_ts, deleted_ts } = req.body;
    const query = `
        INSERT INTO todo_items (description, completed_ts, updated_ts, deleted_ts)
        VALUES (?, ?, ?, ?)
    `;
    connection.query(
        query,
        [description, completed_ts || null, updated_ts || null, deleted_ts || null],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({ message: 'Todo created', id: results.insertId });
        }
    );
});

// Route to update a specific todo by ID
router.put('/:id', (req, res) => {
    const todoId = req.params.id;
    const completedTs = Math.floor(Date.now() / 1000); // Current Unix timestamp

    const query = `
        UPDATE todo_items 
        SET completed_ts = ? 
        WHERE id = ? AND completed_ts IS NULL
    `;

    connection.query(query, [completedTs, todoId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found or already marked as completed' });
        }

        res.status(200).json({ message: `Todo with ID ${todoId} marked as completed.` });
    });
});

// Route to delete a specific todo by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM todo_items WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted' });
    });
});

module.exports = router;
