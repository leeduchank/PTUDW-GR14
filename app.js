import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';

import { engine } from 'express-handlebars';


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: true
}));


app.engine('hbs', engine({
    defaultLayout: 'main.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('home');
});

app.use(function (req, res) {
    res.status(404);
    res.render('404',{layout:false});
});

const port = 3000;

app.listen(port, function()  {
    console.log(`E-commerce app listening at http://localhost:${port}`)
});