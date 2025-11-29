const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const { listTasks, createTask, updateTask, deleteTask, getTask } = require('../controllers/taskController');

router.get('/', auth, listTasks);
router.get('/:id', auth, getTask); 
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, adminOnly, deleteTask);

module.exports = router;
