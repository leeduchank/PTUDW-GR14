import db from'../ultis/db.js';

export default{
    findAll(){
    return db('space');
    }
}
