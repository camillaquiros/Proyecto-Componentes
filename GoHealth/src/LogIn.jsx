import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

function App() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await fetch("http://localhost:8000/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    contrasena: data.password
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("✅ Sesión iniciada correctamente");
                navigate("/citas"); // Redirige a la página de Citas después del login
            } else {
                alert(`❌ Error: ${result.detail || "Credenciales inválidas"}`);
                console.error("Error del servidor:", result);
            }

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("❌ Error de conexión con el servidor");
        }
    });

    return (
        <main className="min-h-screen w-screen flex items-center justify-center bg-[url('assets/img/back.jpg')] bg-cover bg-center bg-no-repeat">
            <form
                className="flex flex-col gap-5 items-center border-[3px] border-[#007575] bg-white rounded-md w-full max-w-md px-8 py-10"
                onSubmit={onSubmit}
            >
                <div className='space-y-4'>
                    <h1 className='text-2xl font-bold text-center'>Inicio de Sesion</h1>
                    <p className='text-slate-500 text-center'>
                        Inicia sesión para comenzar a agendar tus citas en el momento que desees.
                    </p>
                </div>

                <div className='space-y-3 w-full'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='email' className='text-sm text-slate-700 font-semibold'>
                            Correo Electrónico
                        </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='LuisMiguel@gmail.com'
                            {...register('email', {
                                required: 'El correo electrónico es requerido',
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                    message: "El correo no es válido",
                                  }
                            })}
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 
                                ${errors.email ? 'border-red-500' : 'border-[#007575]'}`}
                        />
                        {errors.email && (
                            <p className='text-red-500 font-medium text-sm w-full'>{errors.email.message}</p>
                        )}
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='password' className='text-sm text-slate-700 font-semibold'>
                            Contraseña
                        </label>
                        <input
                            type='password'
                            id='password'
                            placeholder='*******'
                            {...register('password', {
                                required: 'La contraseña es requerida.'
                            })}
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 
                                ${errors.password ? 'border-red-500' : 'border-[#007575]'}`}
                        />
                        {errors.password && (
                            <p className='text-red-500 font-medium text-sm w-full'>{errors.password.message}</p>
                        )}
                    </div>
                </div>

                <div className='flex gap-3 items-center w-full'>
                    <input
                        type='checkbox'
                        id='terms'
                        className='accent-stone-800 cursor-pointer rounded-sm w-5 h-5'
                        {...register('terms', {
                            required: 'Debes aceptar los términos y condiciones.'
                        })}
                    />
                    <label htmlFor='terms' className='text-sm text-slate-700 font-semibold cursor-pointer leading-5'>
                        He leído y acepto los{' '}
                        <a href='#' className='text-blue-700 underline capitalize'>Términos & condiciones</a>{' '}
                        y la <a href='#' className='text-blue-700 underline'>política de privacidad.</a>
                    </label>
                </div>
                {errors.terms && (
                    <p className='text-red-500 font-medium text-sm w-full'>{errors.terms.message}</p>
                )}

                <div className='flex flex-col gap-3 w-full'>
                    <button
                        type='submit'
                        className="bg-hoverColor text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
                    >
                        Continuar
                    </button>
                    <button
                        type='button'
                        className='underline font-medium cursor-pointer'
                        onClick={() => navigate("/Registro")}
                    >
                        Registrarse
                    </button>
                </div>
            </form>

            <button
                className="absolute top-4 left-4 bg-hoverColor text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => navigate("/home")}
            >
                ← Regresar
            </button>
        </main>
    );
}

export default App;
