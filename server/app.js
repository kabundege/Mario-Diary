import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import user from './routes/user';
import oauth from './routes/socialOauth'
import stories from './routes/story';

const app = express();

app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [process.env.cookieKey]
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use('/api/v1', user);
app.use('/api/v1', stories);
app.use('/api/v1', oauth);

app.use((req, res) =>
  res.status(404).json({
    status: 404,
    error: ' PAGE NOT FOUND '
  })
);

export default app;
