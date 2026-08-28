const express = require("express");
const { users } = require("../Data/user.json");
const router = express.Router()
/*
 * method = GET
 * description = get the information of all the students
 * route = /users
 * access = public
 * parameters = none
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});
/*
 * method = GET
 * description = get the information of a particular student by using there id
 * route = /users/:id
 * access = public
 * parameters = id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((elem) => elem.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      Message: `User is not found ${id}`,
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
/*
 * method = POST
 * description = add the new user data
 * route = /users
 * access = public
 * parameters = none
 */
router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  // Check required fields
  if (
    !id ||
    !name ||
    !surname ||
    !email ||
    !subscriptionType ||
    !subscriptionDate
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  // Check if ID already exists
  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(409).json({
      success: false,
      message: "This user ID already exists",
    });
  }

  // Add new user
  const newUser = {
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  };

  users.push(newUser);

  return res.status(201).json({
    success: true,
    message: "User added successfully",
    data: newUser,
  });
});

/*  
 * method = PUT
 * description = update the user data by using the id
 * route = /users/:id
 * access = public
 * parameters = id
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const  data   = req.body;

  const check = users.find((user) => user.id === id);
  if (!check) {
    return res.status(404).json({
      success: false,
      message: `Soory user not found for id : ${id}`,
    });
  }

  const updateUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }else{
      return each;
    }
  });

  res.status(200).json({
    success:true,
    data : updateUser,
    message:"User update successfully"
  })

});
/*  
 * method = DELETE
 * description = delete the user with the id 
 * route = /users/:id
 * access = public 
 * parameters = id
 */
router.delete('/:id',(req,res)=>{

  const {id} = req.params;

  const check = users.find((user) => user.id === id);
  if (!check) {
    return res.status(404).json({
      success: false,
      message: `Soory user not found for id : ${id}`,
    });
  }
const updateUser = users.filter((each) => each.id !== id)

  // const indexUser = users.indexOf(check)
  // users.splice(indexUser,1)

  res.status(200).json({
    success:true,
    message:"User delete successfully",
    data : updateUser
  })

})

  module.exports = router;