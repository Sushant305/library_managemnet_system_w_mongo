const { bookModel, userModel } = require("../models/index");

// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });

exports.getAllUsers = async (req, res) => {
  const users = await userModel.find();
  if (users.length === 0) {
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
