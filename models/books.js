import { readFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { write as writeDataToFile } from '../utils/write-to-file.js';

const books = JSON.parse(await readFile(new URL('../data/books.json', import.meta.url)));
const fileURL = "./data/books.json";

// function find all data
export const findAll = () => { 
    return new Promise((resolve, reject) => {
        resolve(books)
    })
};


// function find single data by id
export const findById = (id) => {
    return new Promise((resolve, reject) => {
        const book = books.find((p) => p.id === id)
        
        resolve(book)
    })
}

// function create data
export const create = (book) => { 
    return new Promise((resolve, reject) => {
        const newBook = {id: uuid(), ...book}
        books.push(newBook);
        
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(fileURL, books);
        }
        resolve(newBook)
    })
};

// function update data by id
export const update = (id, book) => { 
    return new Promise((resolve, reject) => {
        const index = books.findIndex((p) => p.id === id)
        books[index] = {id, ...book}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(fileURL, books);
        }
        resolve(books[index])
    })
};

// function remove data by id
export const remove = (id) => { 
    return new Promise((resolve, reject) => {
        const newBooks = books.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(fileURL, newBooks);
        }
        resolve();
    })
};