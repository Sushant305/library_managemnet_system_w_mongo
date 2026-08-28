const express = require("express");
const { users } = require("./Data/user.json");

const userRouter = require("./routes/user")
const booksRouter = require("./routes/books")

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ Message: "Home Page :-)" });
});


app.use("/users",userRouter)

app.use("/books",booksRouter)




app.listen(PORT, () => {
  console.log(`Your server is up and running http://localhost:${PORT}`);
});
