import express, { json } from "express";
import cors from "cors";
import handleErrorMiddleware from "./middleware/handleErrorMiddleware";

const app = express();

app.use(json());
app.use(cors());
app.use(handleErrorMiddleware);

export default app