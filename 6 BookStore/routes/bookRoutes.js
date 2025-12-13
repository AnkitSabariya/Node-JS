const express = require('express');
const router = express.Router();
const {
addBook,
getBooks,
getBookById,
updateBook,
deleteBook
} = require('../controllers/bookController');


router.post('/add', addBook);
router.get('/get', getBooks);
router.get('/getall/:id', getBookById);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);


module.exports = router;