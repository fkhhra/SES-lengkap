import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { CreateStudentValidator, UpdateStudentValidator, DeleteBookValidator } from '#validators/student'

export default class StudentsController {
  public async index({ response }: HttpContext) {
    const students = await Student.all()
    return response.ok({
      message: 'List of students retrieved successfully',
      data: students,
    })
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing( CreateStudentValidator)
    const student = await Student.create(payload)

    return response.created({
      message: 'Student created successfully',
      data: student,
    })
  }

  public async show({ params, response }: HttpContext) {
    const student = await Student.find(params.id)
    if (!student) {
      return response.notFound({ message: 'Student not found' })
    }

    return response.ok({
      message: 'Student retrieved successfully',
      data: student,
    })
  }

  public async update({ params, request, response }: HttpContext) {
    const student = await Student.find(params.id)
    if (!student) {
      return response.notFound({ message: 'Student not found' })
    }

    const payload = await request.validateUsing( UpdateStudentValidator )
    student.merge(payload)
    await student.save()

    return response.ok({
      message: 'Student updated successfully',
      data: student,
    })
  }

public async destroy({ params, response }: HttpContext) {
  // Validate params using VineJS validator
  const { id } = await DeleteBookValidator.validate(params)

  const student = await Student.find(id)
  if (!student) {
    return response.notFound({ message: 'Student not found' })
  }
  
  await student.delete()
  return response.ok({ message: 'Student deleted successfully' })
}
}
