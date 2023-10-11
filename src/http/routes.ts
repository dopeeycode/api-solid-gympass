import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
}
