import {Router} from 'express'
import {login, register, logout, profile} from '../controllers/auth.controller.js'
import {authRequired} from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middlewares.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

// Crea un enrutador.
const router = Router()

// Define la ruta, validando el esquema antes de procesar.
router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema),login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

export default router;