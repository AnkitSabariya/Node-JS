const Book = require("../model/bookSchema");


exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      total: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateBook = async (req, res) => {
  try {
        const id = req.params.id;
    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteBook = async (req, res) => {
  try {
     const id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
