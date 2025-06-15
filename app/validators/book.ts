import vine from '@vinejs/vine'

export const CreateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(10),
    author: vine.string().trim().minLength(3).maxLength(10),
    category: vine.string().trim().minLength(3).maxLength(10),
  })
)

export const UpdateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(10).optional(),
    author: vine.string().trim().minLength(3).maxLength(10).optional(),
    category: vine.string().trim().minLength(3).maxLength(10),
  })
)

export const DeleteBookValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
  })
)