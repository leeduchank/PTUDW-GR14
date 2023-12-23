import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';
import spacesModel from "./models/spaces.model.js";

import { engine } from 'express-handlebars';
import surfacesModel from "./models/surfaces.model.js";


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

app.get('/admin/spaces', async function(req, res) {
    const spacesList = await spacesModel.findAll();
    // console.log(spacesList);
    res.render('vwSpaces/index.hbs',
    {spaces : spacesList
    });
});

app.get('/admin/surfaces', async function(req, res) {
    const surfacesList = await surfacesModel.findAll();
    console.log(surfacesList);
    res.render('vwSurfaces/index.hbs',
        {surfaces : surfacesList
        });
});


app.get('/admin/reports', function (req, res) {
    res.render('home');
});

app.get('/admin/surfaces/bySpace/:id',async function (req, res) {
    const spaceId = req.params.id || 0;
    console.log(spaceId);
    const surfacesList = await surfacesModel.findBySpaceId(spaceId);
    console.log(surfacesList);
    res.render('vwSurfaces/SurfacesbySpace.hbs',
    {surfaces : surfacesList}
    );
});

app.use(function (req, res) {
    res.status(404);
    res.render('404',{layout:false});
});

const port = 3000;

app.listen(port, function()  {
    console.log(`E-commerce app listening at http://localhost:${port}`)
});
