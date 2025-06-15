/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import BooksController from '#controllers/books_controller'
import StudentsController from '#controllers/students_controller'
import router from '@adonisjs/core/services/router'



router.get('/', async () => {
  return {
    hello: 'paryy',
  }
})

// router.group(() => {
//   router.get('/', [BooksController, 'index'])
//   router.post('/', [BooksController, 'store'])
//   router.get('/:id', [BooksController, 'show'])
//   router.put('/:id', [BooksController, 'update'])
//   router.delete('/:id', [BooksController, 'destroy'])
// })
// .prefix('/book')
 
// router.resource('book', BooksController).apiOnly()
// router.resource('student',StudentsController ).apiOnly()
router.group(() => {
  router.resource('book', BooksController).apiOnly()
  router.resource('students', StudentsController).apiOnly()
}).prefix('/api')
