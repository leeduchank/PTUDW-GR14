import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


import accountRoute from '../routes/account.route.js';


import spaceRoute from '../routes/space.route.js';
import surfaceRoute from "../routes/surface.route.js";
import reportRoute from "../routes/report.route.js";

import auth from './auth.mdw.js';

export default function (app) {
  app.get('/', function (req, res) {
    // res.send('Hello World!');
    res.render('home');

    //res.redirect('/account/login');
  });

  app.get('/about', function (req, res) {
    res.render('about', {
      layout: 'main.hbs'
    });
  });

  app.get('/bs4', function (req, res) {
    res.sendFile(__dirname + '/bs4.html');
  });

  app.get('/err', function (req, res) {
    throw new Error('Error!');
  });


  app.use('/account', accountRoute);
  app.use('/admin', spaceRoute);
  app.use('/admin', surfaceRoute);
  app.use('/admin', reportRoute);
  app.use('/admin', reportRoute);


  app.use(function (req, res, next) {
    res.render('404', { layout: false });
  });
// Error handling 500
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    // res.status(500).send('Something broke!')
    res.render('500', { layout: false });
  });
}

