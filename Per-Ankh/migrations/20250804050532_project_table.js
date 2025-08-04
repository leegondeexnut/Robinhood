/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('project', function(table){
        table.increments("project_id")
        table.integer("user_id").references('use_id').inTable('user')
        table.string('roll', 32).notNullable()
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
