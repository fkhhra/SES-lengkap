import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { CreateBookValidator, DeleteBookValidator, UpdateBookValidator,  } from '#validators/book'

export default class BooksController {
  public async index({ response }: HttpContext) {
    const book = await Book.all()
    return response.ok({
      message: 'List of books retrieved successfully',
      data: book,
    })
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing( CreateBookValidator )
    const book = await Book.create(payload)
    return response.created({
      message: 'Book created successfully', data: book,})
  }

  public async show({ params, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.notFound({ message: 'Book not found' })
    }
    return response.ok({
      message: 'Book retrieved successfully', data: book,})
  }

  public async update({ params, request, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.notFound({ message: 'Book not found' })
    }
    const data = await request.validateUsing( UpdateBookValidator )
    book.merge(data)
    await book.save()
    return response.ok({
      message: 'Book updated successfully', data: book, })
  }

public async destroy({ params, response }: HttpContext) {
  // Validate params using VineJS validator
  const { id } = await DeleteBookValidator.validate(params)

  const book = await Book.find(id)
  if (!book) {
    return response.notFound({ message: 'Book not found' })
  }
  
  await book.delete()
  return response.ok({ message: 'Book deleted successfully' })
}


//  public async destroy({ request, response }: HttpContext) {
//   const params = await request.validateUsing(DeleteBookValidator)
//   const book = await Book.find(params.id)
//   if (!book) {
//     return response.notFound({ message: 'Book not found' })
//   }
//   await book.delete()
//   return response.ok({ message: 'Book deleted successfully' })

//   }
}
