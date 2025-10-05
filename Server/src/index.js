import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { initRedis, closeRedis } from './config/redis.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import otpRouter from './routes/otpRouter.js';

dotenv.config();
const app = express();
// const __dirname = path.resolve();
const PORT = process.env.PORT || 2708;

// init redis
await initRedis();

// cache from disk in expressjs
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '5mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: `${process.env.BASE_URL}`,
      credentials: true,
    })
  );
}

// ROUTES
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/otp', otpRouter);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../Client/dist')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../Client/dist/index.html'));
//   });
// }

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeRedis();
  process.exit(0);
});
