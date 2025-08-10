// migration file: add_email_to_users.js

exports.up = function(knex) {
  return knex.schema.alterTable('project', function(table) {
    table.string('project_name').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('project', function(table) {
    table.dropColumn('project_name');
  });
};