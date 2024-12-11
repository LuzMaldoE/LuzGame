import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, // Datos a incluir en el token.
            TOKEN_SECRET, // Clave secreta para firmar el token.
        {
            expiresIn: "1d"
        },
        (err, token) => {
            if (err) reject(err)
            resolve (token)
        }
        );
    });
}
