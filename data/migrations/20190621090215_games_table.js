
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', function(games){
        games.increments()

        games
        .string('title', 128)
        .notNullable()

        games
        .string('genre', 128)
        .notNullable()

        games
        .integer('releaseYear', 4)
        .notNullable()

        games
        .timestamp('createdAt')
        .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games')
};
