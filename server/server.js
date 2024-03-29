/* eslint no-console:0 */
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import moment from 'moment';
import bodyParser from 'body-parser';
import consoleStamp from 'console-stamp';
import exphbs from 'express-handlebars';
import fs from 'fs';
import path from 'path';
import routes from './routes/index.js';
import authRequest from './middlewares/authRequest.js';
import allowCORSHandler from './middlewares/allowCORS.js';
import notFoundRequest from './middlewares/notFound.js';
import logErrorsHandler from './middlewares/logErrors.js';
import errorHandler from './middlewares/serverError.js';
import * as helpers from './utils/hbsHelpers.js';
import { initDb } from './db.js';

const PRODUCTION_MODE = 'production';

let { PORT = 3000 } = process.env;
const { HOST = 'localhost', TITLE, PID_FILE } = process.env;

const app = express();

consoleStamp(console, { pattern: 'dd/mmm/yyyy:HH:MM:ss o' });

logger.token('date', () => moment().format('DD/MMM/YYYY:HH:mm:ss ZZ'));

//app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
//Defining middleware to serve static files
app.use('/static', express.static(path.join(__dirname, '../public'))); // kde ma hladat public zlozku


// Use Handlebars as my main render engine
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers,
  })
);

app.set('view engine', 'handlebars');

// enable aggressive view caching for production
app.enable('view cache');

app.use('/*', allowCORSHandler);

// <---- SET URLS WHICH BYPASS AUTH LOGIC IN HERE:
app.use(
  '/*',
  authRequest.unless({
    path: ['/login'],
  })
);

app.use('/', routes);
app.use(notFoundRequest);

app.use(logErrorsHandler);
app.use(errorHandler);

// set the port for the webservice
if (process.argv.length > 2) {
  [, , PORT] = process.argv;
}

// set process title
if (process.argv.length > 3) {
  [, , , process.title] = process.argv;
} else if (TITLE) {
  process.title = TITLE;
}

// output process pid into a file if needed (ignore env variable)
if (process.argv.length > 4) {
  fs.writeFile(process.argv[4], process.pid);
} else if (PID_FILE) {
  fs.writeFile(PID_FILE, process.pid);
}

// Start the server
app.set('port', PORT);

initDb(() => {
  app.listen(app.get('port'), HOST, () => {
    if (!process.env.NODE_ENV) {
      console.log('process.env.NODE_ENV is not set!');
    }
    console.log(`WebService has started on ${HOST}:${PORT} running in ${process.env.NODE_ENV} mode`);
    if (process.env.NODE_ENV !== PRODUCTION_MODE) {
      console.log('PLEASE NOTE: your webservice is running not in a production mode!');
    }
  });
});

