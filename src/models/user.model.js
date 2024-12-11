import mongoose from 'mongoose'

// Crea un esquema para los usuarios.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},
{
    timestamps: true // Agrega automáticamente campos de creación y actualización.
})

export default mongoose.model('User', userSchema)