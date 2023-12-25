import db from'../ultis/db.js';

export default{
    findAll() {
        return db('surfaces');
    }
,
    findBySpaceId(spaceId) {
        return db('surfaces').where('space', spaceId);
    }
,
    findPageBySpaceId(spaceId, limit, offset) {
        return db('surfaces').where('space', spaceId).limit(limit).offset(offset);
    }
,
    async countBySpaceId(spaceId) {
        const list = await db('surfaces').where('space', spaceId).count({ amount: 'id_surfaces' });
        return list[0].amount;
    }
}
