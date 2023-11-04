import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { CheckInRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public db: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.db.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

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
