import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';

function LoginPage(){

    const {register, handleSubmit, formState: {errors}, } = useForm();
    const { signin, errors: signingErrors } = useAuth ();

    const onSubmit = handleSubmit(data => {
        signin(data);
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center 
        bg-[url("/img/superNintendo.gif")] bg-contain bg-no-repeat bg-center bg-fixed'>
            <div className='bg-zinc-800/70 max-w-md w-full p-10 rounded-md'>
                {
                    signingErrors.map((error, i) =>(
                        <div className='bg-red-500 p-2 text-white my-1' key={i}>
                            {error}
                        </div>
                    ))
                }

                <h1 className='text-2xl font-bold text-center text-red-300'> Inicio Sesión RetroGame </h1>

                <form onSubmit={onSubmit}>
                    <input 
                        type="email" {...register("email", { required: true })} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                    />
                    {
                        errors.email && <p className="text-red-500" > Se requiere Correo Electronico</p>
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
                        Iniciar Sesión
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between'>
                    ¿No tienes una cuenta? <Link to ="/register" 
                    className='text-sky-500'>Crear una Cuenta </Link>
                </p>
            </div>
    </div>
    )
}

export default LoginPage