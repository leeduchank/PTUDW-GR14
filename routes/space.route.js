import express from 'express';

import spaceModel from "../models/space.model.js";
import surfaceModel from "../models/surface.model.js";
import reportModel from "../models/report.model.js";

const router = express.Router();

router.get('/space', async function(req, res) {
    //const spacesList = await spaceModel.findAll();
    // console.log(req.session.auth);
    // console.log(req.session.authUser);


    // const AdminPermission = {
    //     role: 'district_admin',
    //     district_id:2,
    //     ward_id: 3
    // };


    const AdminPermission = {
        role: req.session.authUser.permission,
        district_id:req.session.authUser.district_id,
        ward_id: req.session.authUser.ward_id,
        city_id: req.session.authUser.city_id
    };
    const spacesList = await spaceModel.displaySpaceDetail(AdminPermission);
    // console.log(spacesList);
    res.render('vwSpace/index.hbs',
        {spaces : spacesList
        });
});

router.get('/space/request/:id', async function (req, res) {
    const spaceId = req.params.id || 0;
    const space = await spaceModel.findById(spaceId);
    //console.log(space);
    res.render('vwSpace/request_space',
        {
            space
        });
});


router.post('/space/request/:id', async function (req, res) {
    const spaceId = req.params.id || 0;
    const entity = req.body;
    console.log(entity)

    entity.longitude = parseFloat(entity.longitude);
    entity.latitude = parseFloat(entity.latitude);

    entity.state = parseInt(entity.state, 10);
    entity.surface_id = parseInt(entity.surface_id, 10);
    entity.space_id = parseInt(entity.space_id, 10);
    entity.ward_id = parseInt(entity.ward_id, 10);

    entity.state = 0; // state: not solve 0

    // Add created_at and updated_at fields with current date and time
    const currentDate = new Date();
    entity.created_at = currentDate;
    entity.updated_at = currentDate;

    try {
        // Use 'await' to wait for the database insertion to complete
        await reportModel.add(entity);

        console.log('Report added:', entity);
        res.redirect( surfaceId);
    } catch (error) {
        console.error('Error adding report:', error);
        res.status(500).send('Error occurred while adding the report.');
    }
});

export default router;