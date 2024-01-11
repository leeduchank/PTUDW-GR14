import express from 'express';

import surfaceModel from "../models/surface.model.js";

const router = express.Router();


router.get('/surface', async function(req, res) {
    const surfacesList = await surfaceModel.findAll();
    // console.log(surfacesList);
    res.render('vwSurface/index.hbs',
        {surfaces : surfacesList
        });
});

router.get('/surface/bySpace/:id',async function (req, res) {
    const spaceId = req.params.id || 0;

    const surfacesList = await surfaceModel.findBySpaceId(spaceId);

    console.log(surfacesList);
    res.render('vwSurface/SurfacesbySpace.hbs', {
        surfaces : surfacesList
    });
});

export default router;
