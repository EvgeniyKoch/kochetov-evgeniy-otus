import express from "express";

import solution from "../app.js";

const app = express();
const port = 8080;

solution(app).listen(port, () => console.log(`Listen on ${port}`));
