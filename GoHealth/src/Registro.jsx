import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 

function App() {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = handleSubmit(data => {
        console.log("Datos del formulario:", data);
    });

    return (
        <main className="min-h-screen w-screen flex items-center justify-center bg-[url('assets/img/back.jpg')] bg-cover bg-center bg-no-repeat">
            <form className='flex flex-col gap-5 items-center border-[3px] border-[#007575] bg-white rounded-md w-full max-w-md px-8 py-10' onSubmit={onSubmit}>
                <div className='space-y-4'>
                    <h1 className='text-2xl font-bold text-center'>
                        Registro de Usuario
                    </h1>
                    <p className='text-slate-500 text-center'>
                        Regístrate para comenzar a agendar tus citas cuando lo desees.
                    </p>
                </div>

                <div className='space-y-4 w-full'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='nombre' className='text-sm text-slate-700 font-semibold'>
                            Nombre
                        </label>
                        <input
                            type='text'
                            id='nombre'
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 
                                ${errors.nombre ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Tu nombre'
                            {...register("nombre", { required: "El nombre es requerido" })}
                        />
                        {errors.nombre && (
                            <p className='text-red-500 font-medium text-sm'>
                                {errors.nombre.message}
                            </p>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='apellido' className='text-sm text-slate-700 font-semibold'>
                            Apellido
                        </label>
                        <input
                            type='text'
                            id='apellido'
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 
                                ${errors.apellido ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Tu apellido'
                            {...register("apellido", { required: "El apellido es requerido" })}
                        />
                        {errors.apellido && (
                            <p className='text-red-500 font-medium text-sm'>
                                {errors.apellido.message}
                            </p>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='cedula' className='text-sm text-slate-700 font-semibold'>
                                Cédula
                         </label>
                    <input
                        type='number'
                        id='cedula'
                        className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 
                             ${errors.cedula ? 'border-red-500' : 'border-[#007575]'}`}
                        placeholder='Tu Cédula'
                        {...register("cedula", { 
                        required: "La cédula es requerida", 
                        minLength: { value: 9, message: "Debe tener 9 dígitos" },
                        maxLength: { value: 9, message: "Debe tener 9 dígitos" }
                    })}
                        onInput={(e) => {
                            if (e.target.value.length > 9) e.target.value = e.target.value.slice(0, 9);
                     }}
                    />
                        {errors.cedula && (
                            <p className='text-red-500 font-medium text-sm'>
                        {errors.cedula.message}
                            </p>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email' className='text-sm text-slate-700 font-semibold'>
                            Correo Electrónico
                        </label>
                        <input
                            type='email'
                            id='email'
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 
                                ${errors.email ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Tu correo electrónico'
                            {...register("email", {
                                required: "El correo electrónico es requerido",
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "El correo no es válido",
                                }
                            })}
                        />
                        {errors.email && (
                            <p className='text-red-500 font-medium text-sm w-full'>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='password' className='text-sm text-slate-700 font-semibold'>
                            Contraseña
                        </label>
                        <input
                            type='password'
                            id='password'
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 
                                ${errors.password ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Tu contraseña'
                            {...register("password", {
                                required: "La contraseña es requerida",
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres"
                                }
                            })}
                        />
                        {errors.password && (
                            <p className='text-red-500 font-medium text-sm'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='confirmPassword' className='text-sm text-slate-700 font-semibold'>
                            Confirmar Contraseña
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 
                                ${errors.confirmPassword ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Confirma tu contraseña'
                            {...register("confirmPassword", {
                                required: "Debes confirmar la contraseña",
                                validate: (value, { password }) =>
                                    value === password || "Las contraseñas no coinciden"
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className='text-red-500 font-medium text-sm'>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className='flex gap-3 items-center w-full'>
                    <input
                        type='checkbox'
                        id='terms'
                        className='accent-stone-800 cursor-pointer rounded-sm w-5 h-5'
                        {...register("terms", {
                            required: "Debes aceptar los términos y condiciones"
                        })}
                    />
                    <label
                        htmlFor='terms'
                        className='text-sm text-slate-700 font-semibold cursor-pointer leading-5 '
                    >
                        He leído y acepto los{' '}
                        <a href='#' className='text-blue-700 underline capitalize '>
                            Términos & condiciones
                        </a>{' '}
                        y la 
                        
                        <a href='#' className='text-blue-700 underline'>
                            Política de privacidad
                        </a>
                    </label>
                </div>

                {errors.terms && (
                    <p className='text-red-500 font-medium text-sm w-full'>
                        {errors.terms.message}
                    </p>
                )}

                <div className='flex flex-col gap-3 w-full'>
                    <button
                        type='submit'
                        className="bg-[#007575] text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
                    >
                        Registrarse
                    </button>
                    <button
						type='button'
						className='underline font-medium cursor-pointer '
						onClick={() => navigate("/Home")}
					>
						Inicio
					</button>
                </div>
            </form>
            <button 
    className="absolute top-4 left-4 bg-hoverColor text-white px-4 py-2 rounded-md shadow-md
                hover:bg-gray-600 transition duration-300 ease-in-out"
    onClick={() => navigate("/LogIn")}
>
    ← Regresar
</button>
        </main>
    );
}

export default App;
