import express from "express";
import { getDatabase } from './index.js'
import cors from 'cors';

const port = 8000;
const app = express();

app.use(cors())

app.get("/posts", async (req, res) => {
  const users = await getDatabase();
  res.json(users);
});

app.listen(port, console.log(`Server started on ${port}`));