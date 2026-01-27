import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { VineString, VineNumber } from '@vinejs/vine'

//pass data
type Options = {
  table: string
  column: string
}

//validation logic-->value--user input,
async function isUnique(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return
  }

  //db query
  const result = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (result) {
    //Report that the value isNOT unique
    field.report('This {{field}} is already taken', 'isUnique', field)
  }
}

//Wraps function into Vine rule.
export const isUniqueRule = vine.createRule(isUnique)

declare module '@vinejs/vine' {
  interface VineString {
    isUnique(options: Options): this
  }

  interface VineNumber {
    isUnique(options: Options): this
  }
}

VineString.macro('isUnique', function (this: VineString, options: Options) {
  return this.use(isUniqueRule(options))
})

VineNumber.macro('isUnique', function (this: VineNumber, options: Options) {
  return this.use(isUniqueRule(options))
})
