const express = require("express");
const { books } = require("../Data/books.json");
const { users } = require("../Data/user.json");
const router = express.Router();


const {userModel , bookModel} = require("../models/index");
// get the logic from the controller
const { getAllBooks, getSingleBookById, getAllIssuedBooks } = require("../controller/book-controller");
/*
 * method = GET
 * description = get the information of all the books
 * route = /books
 * access = public
 * parameters = none
 */
// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: books,
//   });
// });

router.get("/",getAllBooks)

/*
 * method = GET
 * description = get the book by their id
 * route = /books/:id
 * access = public
 * parameters = id
 */

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
router.get("/:id",getSingleBookById)

/*
 * method = POST
 * description = ADD the new book
 * route = /books
 * access = public
 * parameters = none
 */
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
router.post("/", (req, res) => {
  const { id, name, author, genre, price, publisher } = req.body;
  const check = books.find((elem) => elem.id === id);

  if (!id || !name || !author || !genre || !price || !publisher === undefined) {
    return res.status(404).json({
      success: false,
      Message: `plz fill all the require fields`,
    });
  }

  if (check) {
    return res.status(404).json({
      success: false,
      Message: `This book with same id is already exist`,
    });
  }

  const newBook = { id, name, author, genre, price, publisher };
  books.push(newBook);
  return res.status(201).json({
    success: true,
    message: "book added successfully",
    data: books,
  });
});

/*
 * method = PUT
 * description = Update the user
 * route = /books/:id
 * access = public
 * parameters = id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const check = books.find((elem) => elem.id === id);

  if (!check) {
    return res.status(404).json({
      success: false,
      Message: `This book is not exist`,
    });
  }

  const updateBookData = books.map((elem) => {
    if (elem.id === id) {
      return { ...elem, ...data };
    } else {
      return elem;
    }
  });

  res.status(200).json({
    success: true,
    data: updateBookData,
    message: "book update successfully",
  });
});

/*
 * method = DELETE
 * description = delete the user with the id
 * route = /books/:id
 * access = public
 * parameters = id
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const check = books.find((book) => book.id === id);
  if (!check) {
    return res.status(404).json({
      success: false,
      message: `Soory book is not found for id : ${id}`,
    });
  }
  const updateBook = books.filter((each) => each.id !== id);

  // const indexUser = users.indexOf(check)
  // users.splice(indexUser,1)

  res.status(200).json({
    success: true,
    message: "User delete successfully",
    data: updateBook,
  });
});

/*
 * method = GET
 * description = get the user with the issued books
 * route = /books/issued/for-users
 * access = public
 * parameters = none
 */

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

router.get("/issued/for-users", getAllIssuedBooks);

/*
 * method = GET
 * description = get the subscription details
 * route = /subscription-details/:id
 * access = public
 * parameters = id
 */

router.get('/subscription-details/:id', (req, res) => {
    const { id } = req.params;

    // Find the user by ID
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        });
    }

    // Extract the subscription details
    const getDateInDays = (data = '') =>{
        let date;
        if(data){
            date = new Date(data);
        }else{
            date = new Date();
        }
        let days = Math.floor( date/ (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90
        }else if(user.subscriptionType === "Standard"){
            date = date + 180
    }else if(user.subscriptionType === "Premium"){
            date = date + 365
        }
        return date;
    }

    // Subscription Expiration Calculation 
    // January 1, 1970 UTC // milliseconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data
    });
});

module.exports = router;
