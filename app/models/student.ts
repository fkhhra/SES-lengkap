import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Students extends BaseModel {
  @column({ isPrimary: true })
  public id: number | undefined

  @column()
  public name: string | undefined

  @column()
  public email: string | undefined

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime | undefined

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | undefined
}
