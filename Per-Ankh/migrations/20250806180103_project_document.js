


exports.up = async (knex) => {
  await knex.schema.createTable('project_document', (table) => {
    table.increments('id').primary();
    table.integer('project_id').unsigned().references('project_id').inTable('project').onDelete('CASCADE');
    table.string('file_name', 255).notNullable();
    table.string('file_url', 255).notNullable();
    table.string('status', 50).defaultTo('Pending');
    table.timestamp('uploaded_at').defaultTo(knex.fn.now());
    table.integer('uploaded_by').unsigned().references('use_id').inTable('users');
    table.string('document_type', 50);
    table.check("status IN ('Pending', 'Approved', 'Rejected')");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('project_document');
};
