import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public db: CheckIn[] = []
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date() : null,
      created_at: new Date(),
    }
    this.db.push(checkIn)

    return checkIn
  }
}
