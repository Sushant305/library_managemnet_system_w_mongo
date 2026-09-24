const { bookModel, userModel } = require("../models/index");
const issuedBook = require("../dtos/book-dto");

//  router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: books,
//   });
// });
exports.getAllBooks = async (req, res) => {
  const books = await bookModel.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Books in the system",
    });
  }

  res.status(200).json({
    success: true,
    data: books,
  });
};

// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   const book = books.find((elem) => elem.id === id);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       Message: `book is not found ${id}`,
//     });
//   }

//   res.status(200).json({
//     success: true,
//     data: book,
//   });
// });
exports.getSingleBookById = async () => {
  const { id } = req.params;
  const book = await bookModel.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      Message: `book is not found ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    data: book,
  });
};

// router.get("/issued/for-users", (req, res) => {
//   const userWithIssuedBooks = users.filter((each) => each.issuedBook);

//   const issuedBooks = [];

//   userWithIssuedBooks.forEach((each) => {
//     const book = books.find((book) => book.id === each.issuedBook);

//     if (book) {
//       book.issuedBy = each.name;
//       book.issuedDate = each.issuedDate;
//       book.returnDate = each.returnDate;

//       issuedBooks.push(book);
//     }
//   });

//   if (issuedBooks.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "No Books issued yet",
//     });
//   }

//   return res.status(200).json({
//     success: true,
//     data: issuedBooks,
//   });
// });
exports.getAllIssuedBooks = async (req, res) => {
  const users = await userModel
    .find({
      issuedBook: { $exists: true },
    })
    .populate("issuedBook");

  const issuedBooks = users.map((each) => {
    return new issuedBook(each);
  });

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Books are Available",
    });
  }

  res.status(200).json({
    success: true,
    data: issuedBooks,
  });
};

// router.post("/", (req, res) => {
//   const { id, name, author, genre, price, publisher } = req.body;
//   const check = books.find((elem) => elem.id === id);

//   if (!id || !name || !author || !genre || !price || !publisher === undefined) {
//     return res.status(404).json({
//       success: false,
//       Message: `plz fill all the require fields`,
//     });
//   }

//   if (check) {
//     return res.status(404).json({
//       success: false,
//       Message: `This book with same id is already exist`,
//     });
//   }

//   const newBook = { id, name, author, genre, price, publisher };
//   books.push(newBook);
//   return res.status(201).json({
//     success: true,
//     message: "book added successfully",
//     data: books,
//   });
// });
exports.addNewBook = async (req, res) => {

  const { data } = req.body;

  if (!data || Object.keys(data).length == 0) {

    return res.status(400).json({
      success: false,
      message: "Please Provide the data Here",
    });

  }

  await bookModel.create(data);

  const allBooks = await bookModel.find();

  res.status(200).json({
    success: true,
    message: "Books Added Successfully",
    data: allBooks,
  });
};

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const data = req.body;
//   const check = books.find((elem) => elem.id === id);

//   if (!check) {
//     return res.status(404).json({
//       success: false,
//       Message: `This book is not exist`,
//     });
//   }

//   const updateBookData = books.map((elem) => {
//     if (elem.id === id) {
//       return { ...elem, ...data };
//     } else {
//       return elem;
//     }
//   });

//   res.status(200).json({
//     success: true,
//     data: updateBookData,
//     message: "book update successfully",
//   });
// });
exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data || Object.keys(data).length == 0) {
    return res.status(400).json({
      success: false,
      message: "Please Provide the data Here",
    });
  }
  const updatedBook = await bookModel.findOneAndUpdate(
    { _id: id },
    data,
    { new: true,}
  );
  if (!updatedBook) {
    return res.status(400).json({
      success: false,
      messgae: `Book Not Found for id:${id}`,
    });
  }
  res.status(200).json({
    success: true,
    message: "Book update Successfully",
    data: updatedBook,
  });
};

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;

//   const check = books.find((book) => book.id === id);
//   if (!check) {
//     return res.status(404).json({
//       success: false,
//       message: `Soory book is not found for id : ${id}`,
//     });
//   }
//   const updateBook = books.filter((each) => each.id !== id);

//   // const indexUser = users.indexOf(check)
//   // users.splice(indexUser,1)

//   res.status(200).json({
//     success: true,
//     message: "User delete successfully",
//     data: updateBook,
//   });
// });
exports.deleteBookById = async (req, res) => {
  const { id } = req.params;

  const book = await bookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `Book Not Found For id:${id}`,
    });
  }
  await bookModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    messgae: "Book Delete Successfully",
  });
};
