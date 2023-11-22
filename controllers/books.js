import * as Book from "../models/books.js";

// @desc    Gets All Books
// @route   GET /api/books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(books));
  } catch (error) {
    console.log(error);
  }
};

// @desc    Get Single Book
// @route   GET /api/books/:id
export const getBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);

    if (!book) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(book));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc    Create a Book
// @route   POST /api/books
export const createBook = async (req, res) => {
  try {
    let image = req.file.filename;
    const timestampMilliseconds = new Date().getTime();

    const { type, title, description, author, pages, language, website } =
      req.body;

    const data = {
      image: `https://6d25tc-5001.csb.app/images/books/` + image,
      type: type,
      title: title,
      description: description,
      author: author,
      pages: pages,
      currentPage: "1",
      language: language,
      link: website,
      score: "0",
      status: "not started",
      dateAdded: String(timestampMilliseconds),
      dateStart: "0",
      dateEnd: "0",
    };

    const newBook = await Book.create(data);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newBook));
  } catch (error) {
    console.log(error);
  }
};

// @desc    Update a Book
// @route   PATCH /api/books/:id
export const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);

    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      const {
        type,
        image,
        title,
        description,
        author,
        pages,
        currentPage,
        language,
        website,
        score,
        status,
        dateAdded,
        dateStart,
        dateEnd,
      } = req.body;

      const bookData = {
        image: req.file?.filename
          ? `https://6d25tc-5001.csb.app/images/books/` + req.file.filename
          : book.image,
        type: type || book.type,
        title: title || book.title,
        description: description || book.description,
        author: author || book.author,
        pages: pages || book.pages,
        currentPage: currentPage || book.currentPage,
        language: language || book.language,
        link: website || book.link,
        score: score || book.score,
        status: status || book.status,
        dateAdded: dateAdded || book.dateAdded,
        dateStart: dateStart || book.dateStart,
        dateEnd: dateEnd || book.dateEnd,
      };

      const updBook = await Book.update(id, bookData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updBook));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc    Delete Book
// @route   DELETE /api/book/:id
export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);

    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book Not Found" }));
    } else {
      await Book.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Book ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
};
