import User from '../models/user.model.js'
import bcrypt from 'bcryptjs' // Librería para encriptar y comparar contraseñas.
import {createAccessToken} from '../libs/jwt.js'

// Controlador para registrar un nuevo usuario.
export const register = async (req, res) => {
    const {email, password, username} = req.body
    
    try{
        // Verifica si el email ya está registrado.
        const userFound = await User.findOne({email});
        if (userFound)
            return res.status(400).json(['El correo electrónico ya está en uso']);

        // Encripta la contraseña.
        const passwordHash = await bcrypt.hash (password, 10);
        
        // Crea un nuevo usuario con los datos proporcionados.
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        // Guarda el usuario en la base de datos.
        const userSaved = await newUser.save();

        // Genera un token de acceso para el usuario registrado.
        const token = await createAccessToken({id: userSaved._id});
        res.cookie("token", token); // Almacena el token en una cookie.

        // Devuelve los datos del usuario registrado.
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const userFound = await User.findOne({email})
        if (!userFound) return res.status(400).json({message: "Usuario no encontrado"});

        const ismatch = await bcrypt.compare (password, userFound.password);
        if (!ismatch) return res.status(400).json({message:"Contraseña incorrecta"});

        const token = await createAccessToken ({id: userFound._id});
        res.cookie("token", token, {
            sameSite: 'none',
            secure: true, 
            httpOnly: false,
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

export const logout = (req, res) => {
    res.cookie('token', " ", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound)
        return res.status(400).json({message:'User not found'});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
    res.send('profile')
}