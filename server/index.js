const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)


// Connect to MongoDB
mongoose.connect('mongodb+srv://harishkevin:Harhyd987.@cluster0.wmgrbwr.mongodb.net/leetcode', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "leetcode" });

app.listen(3000, () => console.log('Server running on port 3000'));