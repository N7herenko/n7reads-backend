import { readFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { write as writeDataToFile } from '../utils/write-to-file.js';

const notes = JSON.parse(await readFile(new URL('../data/notes.json', import.meta.url)));
const fileURL = "./data/notes.json";

// function find all data
export const findAll = () => { 
    return new Promise((resolve, reject) => {
        resolve(notes)
    })
};

// function find single data by id
export const findById = (id) => {
    return new Promise((resolve, reject) => {
        const note = notes.find((p) => p.id === id)
        
        resolve(note)
    })
}

// function create data
export const create = (note) => { 
    return new Promise((resolve, reject) => {
        const currentTimestamp = Date.now(); 
        const newNote = {id: uuid(), ...note, datetime: currentTimestamp}
        notes.push(newNote);
        
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(fileURL, notes);
        }
        resolve(newNote)
    })
};

// function update data by id
export const update = (id, note) => { 
    return new Promise((resolve, reject) => {
        const index = notes.findIndex((p) => p.id === id)
        notes[index] = {id, ...note}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(fileURL, notes);
        }
        resolve(notes[index])
    })
};

// function remove data by id
export const remove = (id) => { 
    return new Promise((resolve, reject) => {
        const newNotes = notes.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(fileURL, newNotes);
        }
        resolve();
    })
};