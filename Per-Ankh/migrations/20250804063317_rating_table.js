exports.up = function (knex) {
  return knex.schema.createTable("rating", function (table) {
    table.increments("rating_id");
    table.integer("likes").nullable().defaultTo(0);
    table.integer("dislikes").nullable().defaultTo(0);
    table.integer("user_id").references("use_id").inTable("users").onDelete('CASCADE');
    table.integer("post_id").references("post_id").inTable("feeds").onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rating");
};
