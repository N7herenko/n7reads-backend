import express from 'express';

import { getNotes, getNote, createNote, updateNote, deleteNote } from '../controllers/notes.js';

const router = express.Router();

router.get('/', getNotes);

router.get('/:id', getNote);

router.post('/', createNote);

router.patch('/:id', updateNote);

router.delete('/:id', deleteNote);

export default router;