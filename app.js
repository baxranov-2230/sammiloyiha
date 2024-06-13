require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const postModel = require("./models/post.model");
const postRoute = require("./routes/post.route");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const errrorMiddleware = require("./middlewaress/errror.middleware");
const cors = require("cors");
const app = express();
app.use(express.json()); //bu bizar json fayildan foydalanayotganimizni anglatadi
app.use(cookieParser({}));
app.use(fileUpload({}));
app.use(express.static("static"));
app.use(cors());
//Routes
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use(errrorMiddleware);
// app.get("/", (req, res) => {
//   // req - so'rov
//   // res - javob
//   res.send("Hello Ahror");
// });

// app.post("/", async (req, res) => {
//   try {
//     const { title, body } = req.body;
//     const newPost = await postModel.create({ title, body });
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// app.delete("/:id", (req, res) => {
//   const { id } = req.params; //delete methodda faqat paramslarni olish mumkin bodyni olib bo'lmaydi
//   res.send(id);
// });
// app.put("/:id", (req, res) => {
//   const { id } = req.params; //put methodda body va paramslarni ham olishim mumkin
//   const body = req.body;
//   res.json({ id, body });
// });

const PORT = process.env.PORT;
const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("connected DB"));
    app.listen(PORT, () => console.log(`Listining - localhost:${PORT}`));
  } catch (error) {
    console.log(`Error conniction with DB ${error}`);
  }
};
bootstrap();
