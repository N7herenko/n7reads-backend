import * as Goal from '../models/goal.js';

// @desc    Get a Goal
// @route   GET /api/goal
export const getGoal = async (req, res) => {
    try {
        const goal = await Goal.get()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(goal));
    } catch (error) {
        console.log(error)
    }
}

// @desc    Set a Goal
// @route   PATCH /api/goal
export const setGoal = async (req,res) => {
    try {
        const { year, numberBooks } = req.body;

        const goalData = {
            year: year,
            numberBooks: numberBooks
        }

        const setGoal = await Goal.set(goalData)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(setGoal)) 
    } catch (error) {
        console.log(error)
    }
};