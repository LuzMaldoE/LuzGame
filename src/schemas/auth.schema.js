// Librería para validar y definir esquemas de datos.
import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre es requerido'
    }),
    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        message: 'Email es invalido'
    }),
    password: z.string({
        required_error: 'Contraseña es requerida'
    }).min(6,{
        message: "La Contraseña debe tener al menos 6 caracteres"
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es requerido",
    }).email({
        message: "Email no es valido"
    }),
    password: z.string({
        required_error: "Contraseña es requerida",
    }).min(6, {
        message: "La Contraseña debe tener al menos 6 caracteres"
    }),
})