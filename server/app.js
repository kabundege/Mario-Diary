import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';
import passport from 'passport';
import routes from './routes/router';

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
 
app.use('/api/v1', routes);

app.get('/',(req, res) =>
  // res.status(200).json({
  //   status: 200,
  //   message: ' Mario Welcomes You'
  // })
  res.sendFile(__dirname + '/templates/index.html')
);

app.use((req, res) =>
  res.status(404).json({
    status: 404,
    error: ' PAGE NOT FOUND '
  })
);

export default app;
