import { Router } from 'express'

import { usersRouter } from './usersRouter'
import { sessionsRouter } from './sessionsRouter'

const router = Router()

router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)

export { router }