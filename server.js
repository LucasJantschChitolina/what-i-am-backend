import express from "express";
import { getDatabase } from './index.js'
import cors from 'cors';
import dotenv from 'dotenv'

const port = 3000;
const app = express();

dotenv.config()
app.use(cors())

app.get("/posts", async (req, res) => {
  const users = await getDatabase();
  res.json(users);
});

app.listen(port, console.log(`Server started on ${port}`));