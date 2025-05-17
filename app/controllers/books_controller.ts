import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { CreateBookValidator, UpdateBookValidator } from '#validators/book'

export default class BooksController {
  public async index({ response }: HttpContext) {
    const books = await Book.all()
    return response.ok({
      message: 'List of books retrieved successfully',
      data: books,
    })
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validate({ schema: CreateBookValidator })
    const book = await Book.create(data)
    return response.created({
      message: 'Book created successfully',
      data: book,
    })
  }

  public async show({ params, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.notFound({ message: 'Book not found' })
    }
    return response.ok({
      message: 'Book retrieved successfully',
      data: book,
    })
  }

  public async update({ params, request, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.notFound({ message: 'Book not found' })
    }
    const data = await request.validate({ schema: UpdateBookValidator })
    book.merge(data)
    await book.save()
    return response.ok({
      message: 'Book updated successfully',
      data: book,
    })
  }

  public async destroy({ params, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.notFound({ message: 'Book not found' })
    }
    await book.delete()
    return response.ok({
      message: 'Book deleted successfully',
    })
  }
}
