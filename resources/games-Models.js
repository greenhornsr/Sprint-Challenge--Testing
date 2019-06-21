const db = require('../data/dbConfig');

module.exports = {
    find, 
    add, 
    remove,
}

function find(){
    return db('games')
}

function add(game){
    return db('games')
    .insert(game, 'id')
    .then(ids => {
        return db('games')
        .where({id: ids[0]})
        .first()
    })
}

function remove(){
    return null
}