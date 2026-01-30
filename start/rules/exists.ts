import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { VineNumber } from '@vinejs/vine'

//pass data
type Options = {
  table: string
  column: string
}

//validation logic-->value--user input,
async function isExists(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return
  }

  //db query
  const result = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (!result) {
    //Report that the value isNOT unique
    field.report('Value for {{field}} does not exist', 'isExists', field)
  }
}

//Wraps function into Vine rule.
export const isExistsRule = vine.createRule(isExists)

declare module '@vinejs/vine' {
  
  interface VineNumber {
    isExists(options: Options): this
  }
}

VineNumber.macro('isExists', function (this: VineNumber, options: Options) {
  return this.use(isExistsRule(options))
})
