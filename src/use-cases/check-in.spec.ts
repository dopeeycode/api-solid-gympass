import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in'

let usersRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(usersRepository)
    // sut => System under test
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'userId-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
