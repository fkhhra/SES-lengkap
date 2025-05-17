import { schema, rules } from '@adonisjs/validator'

export const CreateBookValidator = schema.create({
  title: schema.string({}, [rules.maxLength(255)]),
  author: schema.string({}, [rules.maxLength(255)]),
})

export const UpdateBookValidator = schema.create({
  title: schema.string.optional({}, [rules.maxLength(255)]),
  author: schema.string.optional({}, [rules.maxLength(255)]),
})
