import axios from "axios";

// function find data
export const find = async () => {
    try {
        const quoteResponse = await axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru');
        const quoteData = quoteResponse.data;
        return quoteData;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch quote from API');
    }
};