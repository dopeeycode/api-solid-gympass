import { FastifyInstance } from 'fastify'
import { authenticateUserController } from './controllers/authenticate'
import { registerUserController } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)
}
