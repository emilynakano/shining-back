import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import handleErrorMiddleware from './middleware/handleErrorMiddleware';

import router from './routes';

const app = express();

app.use(json());
app.use(cors());

app.use(router);
app.use(handleErrorMiddleware);

export default app;
