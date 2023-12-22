import db from'../ultis/db.js';

export default{
    findBySpaceId(spaceId) {
        return db('surfaces').where('space', spaceId);
    }
}
