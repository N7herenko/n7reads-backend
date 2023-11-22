import * as Quote from '../models/quote.js';

// @desc    Get Single Quote
// @route   GET /api/quote
export const getQuote = async (req, res) => {
    try {
        const quote = await Quote.find()

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify(quote));
    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}