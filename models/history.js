import { readFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { write as writeDataToFile } from '../utils/write-to-file.js';

const histories = JSON.parse(await readFile(new URL('../data/history.json', import.meta.url)));
const fileURL = "./data/history.json";

// function find all data
export const findAll = () => { 
    return new Promise((resolve, reject) => {
        resolve(histories)
    })
};

// function create data
export const create = (history) => { 
    return new Promise((resolve, reject) => {
        const newHistories = {id: uuid(), ...history}
        histories.push(newHistories);
        
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(fileURL, histories);
        }
        resolve(newHistories)
    })
};