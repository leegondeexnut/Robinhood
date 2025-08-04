/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', function (table){
        table.increments('use_id')
        table.string('username', 104).notNullable()
        table.string('email', 254).notNullable()
        table.string('bio', 512).nullable().defaultTo('')
        table.string('password', 512).notNullable()
        table.string("image_url", 512).nullable().defaultTo('https://img.freepik.com/premium-vector/parrot-head-mascot-cartoon-vector-illustration-isolated-white-background_1151-78624.jpg')
        table.string('role', 64).notNullable()
        table.timestamps(true, true)


    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('user')
  
};
