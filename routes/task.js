const router = require('express').Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authenticateJWT = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/tasks', authenticateJWT, roleMiddleware(['admin']), createTask);
router.get('/tasks', authenticateJWT, roleMiddleware(['admin']), getAllTasks);
router.put(
  '/tasks/:id',
  authenticateJWT,
  roleMiddleware(['admin']),
  updateTask
);
router.delete(
  '/tasks/:id',
  authenticateJWT,
  roleMiddleware(['admin']),
  deleteTask
);

module.exports = router;
