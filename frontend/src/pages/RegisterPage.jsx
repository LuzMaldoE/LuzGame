import { useForm } from "react-hook-form";
import { useAuth} from '../context/AuthContext.jsx';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
    } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth ();
    const navigate = useNavigate ();

    useEffect (() => {
        if (isAuthenticated) navigate ("/tasks");
        [isAuthenticated]})

    const onSubmit= handleSubmit (async ( values ) => {
        signup(values);
    });    

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center 
        bg-[url("/img/8.jpg")] bg-cover bg-center bg-fixed'> 
            <div className="bg-zinc-500 max-w-md p-10 rounded-md ">
                {
                    registerErrors.map((error, i) => (
                        <div className = "bg-red-500 p-2 text-white" key={i} >
                            {error}
                        </div>
                    ))
                }

                <h1 className='text-2xl font-bold text-center text-red-300'> Crea una Cuenta </h1>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" {...register("username", { required: true })} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                        placeholder="Nombre Usuario"
                    />
                    {
                        errors.username && <p className="text-red-500" > El nombre de usuario es obligatorio </p>
                    }

                    <input 
                        type="email" {...register("email", { required: true })} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                    />
                    {
                        errors.email && <p className="text-red-500" > Se requiere correo electrónico </p>
                    }


                    <input 
                        type="password" {...register("password", { required: true })} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Contraseña"
                    />
                    {
                        errors.password && <p className="text-red-500" > Se requiere contraseña </p>
                    }

                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Registrar
                    </button>
                    <p className='flex gap-x-2 justify-between'>
                        ¿Ya tienes una cuenta? <Link to ="/login" 
                        className='text-sky-500'>Iniciar Sesión</Link>
                    </p>

                </form>
            </div>
        </div>
    );
}
export default RegisterPage;