import * as History from "../models/history.js";

// @desc    Gets All History
// @route   GET /api/history
export const getHistories = async (req, res) => {
  try {
    const histories = await History.findAll();

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(histories));
  } catch (error) {
    console.log(error);
  }
};

// @desc    Create a History
// @route   POST /api/history
export const createHistory = async (req, res) => {
  try {
    const { idBook, dateReadedBook, timeReadBook } = req.body;

    const data = {
      idBook: idBook,
      dateReadedBook: dateReadedBook,
      timeReadBook: timeReadBook,
    };

    const newHistory = await History.create(data);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newHistory));
  } catch (error) {
    console.log(error);
  }
};
