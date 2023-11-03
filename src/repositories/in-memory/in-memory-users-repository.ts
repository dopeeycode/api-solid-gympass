import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public db: User[] = []

  async findByEmail(email: string) {
    const user = this.db.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.db.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const { name, email, password_hash } = data
    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    }
    this.db.push(user)

    return user
  }
}
