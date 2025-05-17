import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { CreateStudentValidator, UpdateStudentValidator } from '#validators/student_validator'

export default class StudentsController {
  public async index({ response }: HttpContext) {
    const students = await Student.all()
    return response.ok({
      message: 'List of students retrieved successfully',
      data: students,
    })
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validate({ schema: CreateStudentValidator })
    const student = await Student.create(data)

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

    const data = await request.validate({ schema: UpdateStudentValidator })
    student.merge(data)
    await student.save()

    return response.ok({
      message: 'Student updated successfully',
      data: student,
    })
  }

  public async destroy({ params, response }: HttpContext) {
    const student = await Student.find(params.id)
    if (!student) {
      return response.notFound({ message: 'Student not found' })
    }

    await student.delete()

    return response.ok({
      message: 'Student deleted successfully',
    })
  }
}
