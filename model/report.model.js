import db from '../utils/db.js';
export default{
    add(entity) {
        return db('report').insert(entity);
    }
    ,
    async findAll()
    {
        return db('report');
    }
    ,
    async viewReportDetail(reportId)
    {
        const list = await db('report').where('report_id', reportId);
        if (list.length === 0)
            return null;
        return list[0];
    }
}
