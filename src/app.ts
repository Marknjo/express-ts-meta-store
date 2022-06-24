/// IMPORTS
import process, { env } from 'process';
import { join } from 'path';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { ClientRouter } from './routes/ClientRoutes';
import { AdminController } from './controllers/AdminController';

new ClientRouter();
new AdminController();

const app = express();

/// General configs
app.disable('x-powered-by');
/// Configure view
app.set('view engine', 'pug');
app.set('views', join(process.cwd(), 'views'));

/// Set public path
app.use(express.static(join(process.cwd(), 'public')));

/// MIDDLEWARES
app.use(cookieParser('my-secret-cookie'));
app.use(express.json({ limit: '10kb' })); /// handle JSON format form submission
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // handle Manual form submission

//// TESTING EXPRESS
///////////////////////////

///////////////////////////
/// Define Routes
// app.get('/', (req, res) => {
//   res.send('<h1>App running</h1>');
// });
// app.use('/', ClientRoute);

/// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log({ Error: err.message });
  console.log(err.cause);
  console.log(err);

  next();
});

/// INIT SERVER
const port = env.PORT || 3000;
const host = env.host || 'localhost';

app.listen(port, () => {
  console.log(`App running on http://${host}:${port}`);
});
