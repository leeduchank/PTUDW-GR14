import db from'../ultis/db.js';

export default{
    findAll() {
        return db('surfaces');
    }
,
    findBySpaceId(spaceId) {
        return db('surfaces').where('space', spaceId);
    }
}
