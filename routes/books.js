import express from 'express';
import multer from 'multer';

import { getBooks, getBook, createBook, updateBook, deleteBook } from '../controllers/books.js';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/images/books/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});
  
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
});

const router = express.Router();

router.get('/', getBooks);

router.get('/:id', getBook);

router.post('/', upload.single('image'), createBook);

router.patch('/:id', upload.single('image'), updateBook);

router.delete('/:id', deleteBook);

export default router;