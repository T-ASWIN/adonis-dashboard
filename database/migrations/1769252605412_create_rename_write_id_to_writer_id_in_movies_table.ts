import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RenameWriteIdToWriterIdInMovies extends BaseSchema {
  protected tableName = 'movies'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('write_id', 'writer_id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('writer_id', 'write_id')
    })
  }
}
