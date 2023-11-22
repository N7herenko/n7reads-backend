import { readFile } from 'fs/promises';
import { write as writeDataToFile } from '../utils/write-to-file.js';

const goal = JSON.parse(await readFile(new URL('../data/goal.json', import.meta.url)));
const fileURL = "./data/goal.json";

// function get data
export const get = () => { 
    return new Promise((resolve, reject) => {
        resolve(goal)
    })
};

// function set data
export const set = (goal) => { 
    return new Promise((resolve, reject) => {
        let newGoal = {...goal}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(fileURL, newGoal);
        }
        resolve(goal)
    })
};