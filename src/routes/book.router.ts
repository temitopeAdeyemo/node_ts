import express from 'express';
import book from '../controllers/book.controller';

const router = express.Router();

router.post('/book', book.book);
router.get('/books', book.getBooks);
router.get('/book', book.getBook);
router.patch('/book', book.updateBook);
router.delete('/book', book.deleteBook);
export = router;
