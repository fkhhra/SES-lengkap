import { schema, rules } from '@adonisjs/validator'

export const CreateStudentValidator = schema.create({
  name: schema.string({}, [rules.maxLength(255)]),
  email: schema.string({}, [
    rules.email(),
    rules.maxLength(255),
  ]),
})

export const UpdateStudentValidator = schema.create({
  name: schema.string.optional({}, [rules.maxLength(255)]),
  email: schema.string.optional({}, [
    rules.email(),
    rules.maxLength(255),
  ]),
})
