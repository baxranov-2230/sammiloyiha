require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const postModel = require("./models/post.model");
const app = express();
app.use(express.json()); //bu bizar json fayildan foydalanayotganimizni anglatadi
app.get("/", (req, res) => {
  // req - so'rov
  // res - javob
  res.send("Hello Ahror");
});
app.get("/post", async (req, res) => {
  try {
    const allPosts = await postModel.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.post("/", async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = await postModel.create({ title, body });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/:id", (req, res) => {
  const { id } = req.params; //delete methodda faqar paramslarni olish mumkin bodyni olib bo'lmaydi
  res.send(id);
});
app.put("/:id", (req, res) => {
  const { id } = req.params; //put methodda body va paramslarni ham olishim mumkin
  const body = req.body;
  res.json({ id, body });
});

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
