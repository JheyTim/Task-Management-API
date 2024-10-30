const router = require('express').Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authenticateJWT = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/tasks',
  authenticateJWT,
  roleMiddleware(['admin', 'user']),
  createTask
);
router.get(
  '/tasks',
  authenticateJWT,
  roleMiddleware(['admin', 'user']),
  getAllTasks
);
router.put(
  '/tasks/:id',
  authenticateJWT,
  roleMiddleware(['admin', 'user']),
  updateTask
);
router.delete(
  '/tasks/:id',
  authenticateJWT,
  roleMiddleware(['admin', 'user']),
  deleteTask
);

module.exports = router;
