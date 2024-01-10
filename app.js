import express from 'express';
import morgan from 'morgan';
import asyncErrors from 'express-async-errors'; // error handling , client: 500 ; console: log error

import activate_locals_middleware from './middlewares/locals.mdw.js';
import activate_view_middleware from './middlewares/view.mdw.js';
import activate_route_middleware from './middlewares/routes.mdw.js';
import activate_session_middleware from './middlewares/session.mdw.js';

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: true
}));
app.use('/public', express.static('public'));

activate_session_middleware(app);
activate_locals_middleware(app);
activate_view_middleware(app);
activate_route_middleware(app);

const port = 3009;
app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
