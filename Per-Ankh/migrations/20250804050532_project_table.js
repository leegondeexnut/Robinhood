/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('project', function(table){
        table.increments("project_id")
        table.string('site', 24).nullable().defaultTo('')
        table.integer('progress').nullable().defaultTo('0')
        table.string('info').nullable().defaultTo("No info yet.")
    } )
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('project')

};
