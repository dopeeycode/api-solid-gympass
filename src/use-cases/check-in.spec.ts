import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let usersRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(usersRepository)
    // sut => System under test

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'userId-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 8, 3, 8, 0, 0))

    await sut.handle({
      gymId: 'gym-01',
      userId: 'userId-01',
    })

    await expect(() =>
      sut.handle({
        gymId: 'gym-01',
        userId: 'userId-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 8, 3, 8, 0, 0))

    await sut.handle({
      gymId: 'gym-01',
      userId: 'userId-01',
    })

    vi.setSystemTime(new Date(2022, 8, 4, 8, 0, 0))

    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'userId-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
