const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateToken = require('../../middlewares/authMiddleware');


router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);


router.post('/', authenticateToken, bookController.createBook);
router.delete('/:id', authenticateToken, bookController.deleteBook);

module.exports = router;