import express from 'express'; 
import morgan from 'morgan'; 
import cookieParser from 'cookie-parser'; 
import cors from 'cors' 

// Importa las rutas relacionadas con autenticación.
import authRoutes from './routes/auth.routes.js' 
import taskRoutes from './routes/tasks.routes.js'

// Crea la aplicación del servidor usando Express.
const app = express (); 

// Aceptar solicitudes desde el frontend.
app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Configura middlewares.
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Agrega las rutas de autenticación en '/api'.
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

export default app;