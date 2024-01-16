import db from '../utils/db.js';

export default{
    findAll(){
    return db('space');
    },
    async findById(id) {
        const list = await db('space').where('space_id', id);
        if (list.length === 0)
            return null;
        return list[0];
    },
    async displaySpaceDetail(user_permission) {
        let rawQuery = `
        SELECT space.space_id,
               space.address,
               space.type,
               space.format,
               space.ward_id,
               ward.ward_name         as ward,
               district.district_name as district,
               city.city_name         as city
        FROM space
        JOIN ward ON space.ward_id = ward.ward_id
        JOIN district ON ward.district_id = district.district_id
        JOIN city ON district.city_id = city.city_id
    `;

        // Customize the query based on user role and permissions
        switch (user_permission.role) {
            case 'ward_admin':
                rawQuery += ` WHERE space.ward_id = ${user_permission.ward_id}`;
                break;
            case 'district_admin':
                rawQuery += ` WHERE ward.district_id = ${user_permission.district_id}`;
                break;
            case 'city_admin':
                rawQuery += ` WHERE district.city_id = ${user_permission.city_id}`;
                break;
            default:
                // Handle other roles or unauthorized cases
                throw new Error('Unauthorized role');
        }
        const raw = await db.raw(rawQuery);
        return raw[0];
    }
}
