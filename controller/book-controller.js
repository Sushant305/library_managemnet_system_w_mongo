const { bookMdodel, userModel } = require("../models/index");
const issuedBook = require("../dtos/book-dto");


//  router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: books,
//   });
// });

exports.getAllBooks = async (req, res) => {
  const books = await bookMdodel.find();

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
  const book = await bookMdodel.findById(id);

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
exports.getAllIssuedBooks = async (req,res) => {
    const users = await userModel.find({
      issuedBook : {$exists:true},
    }).populate("issuedBook")

    const issuedBooks = users.map((each)=>{
      return new issuedBook(each)
    })

    if( issuedBooks.length === 0){
      return res.status(404).json({
        success:false,
        message:"No Books are Available"
      })
    }

    res.status(200).json({
      success: true,
      data: issuedBooks,  
    })
}