import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { indexRouter } from './routers/index.router';
import { authenticationRouter } from './routers/authRouter';

const app = express();

app.set('views', path.join(process.cwd(), 'dist', 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', authenticationRouter);

app.listen(3000, () => {
  console.log(`Server is ran on port 3000`);
})
