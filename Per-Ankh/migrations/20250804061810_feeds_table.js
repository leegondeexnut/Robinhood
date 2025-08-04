exports.up = function (knex) {
  return knex.schema.createTable("feeds", function (table) {
    table.increments("post_id");
    table.integer("user_id").references("use_id").inTable("user");
    table.string("post_text", 512).nullable().defaultTo("");
    table.string("post_image").nullable().defaultTo("no_image");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("feeds");
};
