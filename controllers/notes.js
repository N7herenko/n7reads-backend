import * as Note from '../models/notes.js';

// @desc    Gets All Notes
// @route   GET /api/notes
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify(notes));
    } catch (error) {
        console.log(error)
    }
}

// @desc    Get Single Note
// @route   GET /api/notes/:id
export const getNote = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findById(id);

        if(!note) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Note Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(note))
        }
    } catch (error) {
        console.log(error)
    }
};

// @desc    Create a Note
// @route   POST /api/notes
export const createNote = async (req, res) => { 
    try {
        const { idBook, subject, message } = req.body;
        
        const data = {
            idBook: idBook,
            subject: subject,
            message: message
        }

        const newNote = await Note.create(data)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newNote))  

    } catch (error) {
        console.log(error)
    }
};

// @desc    Update a Note
// @route   PATCH /api/notes/:id
export const updateNote = async (req,res) => {
    try {
        const id = req.params.id;
        const note = await Note.findById(id)

        if(!note) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Note Not Found' }))
        } else {
            const { idBook, subject, message } = req.body;

            const noteData = {
                idBook: idBook || note.idBook,
                subject: subject || note.subject,
                message: message || note.message
            }

            const updNote = await Note.update(id, noteData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updNote)) 
        }
    } catch (error) {
        console.log(error)
    }
};

// @desc    Delete Note
// @route   DELETE /api/notes/:id
export const deleteNote = async (req, res) => { 
    try {
        const id = req.params.id;
        const note = await Note.findById(id)

        if(!note) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Note Not Found' }))
        } else {
            await Note.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Note ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
};