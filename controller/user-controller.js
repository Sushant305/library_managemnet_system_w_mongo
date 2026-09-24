const { bookModel, userModel } = require("../models/index");

// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });
exports.getAllUsers = async (req, res) => {
  const users = await userModel.find();
  if (!users || users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Books in the system",
    });
  }
  res.status(200).json({
    success: true,
    data: users,
  });
};

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((elem) => elem.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       Message: `User is not found ${id}`,
//     });
//   }
//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });
exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const User = await userModel.findById(id);

  if (!User) {
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

// router.post("/", (req, res) => {
//   const { id, name, surname, email, subscriptionType, subscriptionDate } =
//     req.body;

//   // Check required fields
//   if (
//     !id ||
//     !name ||
//     !surname ||
//     !email ||
//     !subscriptionType ||
//     !subscriptionDate
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide all the required fields",
//     });
//   }

//   // Check if ID already exists
//   const user = users.find((each) => each.id === id);

//   if (user) {
//     return res.status(409).json({
//       success: false,
//       message: "This user ID already exists",
//     });
//   }

//   // Add new user
//   const newUser = {
//     id,
//     name,
//     surname,
//     email,
//     subscriptionType,
//     subscriptionDate,
//   };

//   users.push(newUser);

//   return res.status(201).json({
//     success: true,
//     message: "User added successfully",
//     data: newUser,
//   });
// });
exports.addNewUser = async (req, res) => {
  const { data } = req.body;
  if (!data || Object.keys(data).length == 0) {
    return res.status(400).json({
      success: false,
      message: "Please Provide the data Here",
    });
  }
  await bookModel.create(data);

  const users = await userModel.find();

  res.status(200).json({
    success: true,
    message: "Books Added Successfully",
    data: users,
  });
};

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const  data   = req.body;

//   const check = users.find((user) => user.id === id);
//   if (!check) {
//     return res.status(404).json({
//       success: false,
//       message: `Soory user not found for id : ${id}`,
//     });
//   }

//   const updateUser = users.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }else{
//       return each;
//     }
//   });

//   res.status(200).json({
//     success:true,
//     data : updateUser,
//     message:"User update successfully"
//   })

// });
exports.updateTheUser = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data || Object.keys(data).length == 0) {
    return res.status(400).json({
      success: false,
      message: "Please Provide the data Here",
    });
  }
  const updatedUser = await userModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  if (!updatedBook) {
    return res.status(400).json({
      success: false,
      messgae: `Book Not Found for id:${id}`,
    });
  }
  res.status(200).json({
    success: true,
    message: "Book update Successfully",
    data: updatedUser,
  });
};

// router.delete('/:id',(req,res)=>{

//   const {id} = req.params;

//   const check = users.find((user) => user.id === id);
//   if (!check) {
//     return res.status(404).json({
//       success: false,
//       message: `Soory user not found for id : ${id}`,
//     });
//   }
// const updateUser = users.filter((each) => each.id !== id)

//   // const indexUser = users.indexOf(check)
//   // users.splice(indexUser,1)

//   res.status(200).json({
//     success:true,
//     message:"User delete successfully",
//     data : updateUser
//   })

// })
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `Book Not Found For id:${id}`,
    });
  }
  await userModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    messgae: "Book Delete Successfully",
  });
};

// router.get('/subscription-details/:id', (req, res) => {
//     const { id } = req.params;

//     // Find the user by ID
//     const user = users.find((each) => each.id === id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: `User Not Found for id: ${id}`
//         });
//     }

//     // Extract the subscription details
//     const getDateInDays = (data = '') =>{
//         let date;
//         if(data){
//             date = new Date(data);
//         }else{
//             date = new Date();
//         }
//         let days = Math.floor( date/ (1000 * 60 * 60 * 24));
//         return days;
//     }

//     const subscriptionType = (date) => {
//         if(user.subscriptionType === "Basic"){
//             date = date + 90
//         }else if(user.subscriptionType === "Standard"){
//             date = date + 180
//     }else if(user.subscriptionType === "Premium"){
//             date = date + 365
//         }
//         return date;
//     }

//     // Subscription Expiration Calculation
//     // January 1, 1970 UTC // milliseconds

//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpiration < currentDate,
//         subscriptionDaysLeft: subscriptionExpiration - currentDate,
//         daysLeftForExpiration: returnDate - currentDate,
//         returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
//         fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
//     }

//     res.status(200).json({
//         success: true,
//         data
//     });
// });
exports.getSubscriptionDetailsById = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User Not Found id:${id}`,
    });
  }
  const getDateInDays = (data = "") => {
    let date;
    if (data) {
      date = new Date(data);
    } else {
      date = new Date();
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

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
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };

  res.status(200).json({
    success: true,
    data,
  });
};
