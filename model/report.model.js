import express from 'express';
import reportModel from "../models/report.model.js";
import surfaceModel from "../models/surface.model.js";
import spaceModel from "../models/space.model.js";

const router = express.Router();

router.get('/report', async function (req, res) {
    const reportList = await reportModel.findAll();

    res.render('vwReport/index.hbs', {
       reports : reportList
    });
});


router.get('/report/:id', async function (req, res) {
    const surfaceId = req.params.id || 0;
    const surface = await surfaceModel.findById(surfaceId);
    const space = await spaceModel.findById(surface.space_id);
    console.log(surface);
    console.log(space);
    res.render('vwReport/form',
        {
            surface,
            space
        });
});




router.post('/report/:id', async function (req, res) {
    const surfaceId = req.params.id || 0;
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


router.get('/report/detail/:id',async function (req, res) {
    const reportId = req.params.id || 0;
    const reportDetail = await reportModel.viewReportDetail(reportId);

    res.render('vwReport/detail.hbs', {
        details : reportDetail
    });
});

export default router;
