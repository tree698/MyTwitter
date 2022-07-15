import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import tweetsRouter from './router/tweet_router.js';
import authRouter from './router/auth_router.js';
import { config } from './config.js';
import { connectDB } from './db/database.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then((data) => {
    // console.log('init', db);
    app.listen(config.host.port);
  })
  .catch(console.error);
