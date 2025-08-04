exports.up = function (knex) {
  return knex.schema.createTable("project_user", function (table) {
    table.increments("pu_id");
    table.integer("user_id").references("use_id").inTable("users");
    table.string("role").notNullable();
    table.integer("project_id").references("project_id").inTable("project");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("project_user");
};
