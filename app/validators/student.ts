import vine from  '@vinejs/vine'

export const CreateStudentValidator =  vine.compile(
  vine.object({
  name: vine.string().trim().minLength(3).maxLength(10),
  email: vine.string().trim().minLength(3).maxLength(10),
})
)

export const UpdateStudentValidator = vine.compile( 
  vine.object({
  name: vine.string().trim().minLength(3).maxLength(10).optional(),
  email:vine.string().trim().minLength(3).maxLength(10).optional(),
})
)

export const DeleteBookValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
  })
)
