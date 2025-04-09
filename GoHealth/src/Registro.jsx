import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 

function Registro() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = handleSubmit(async data => {
        try {
            const datosUsuario = {
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                telefono: "", // Si decides usarlo luego
                contrasena: data.password,
                rol: "Paciente", // Asegúrate que coincida con tu ENUM en la BD
                cedula: data.cedula
            };
    
            const response = await fetch("http://localhost:8000/usuarios/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datosUsuario),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert("✅ Registro exitoso");
                navigate("/LogIn");
            } else {
                alert(`❌ Error: ${result.detail || "No se pudo registrar"}`);
                console.error("Error del servidor:", result);
            }
    
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error al conectar con el servidor.");
        }
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
                        <label htmlFor='nombre' className='text-sm text-slate-700 font-semibold'>Nombre</label>
                        <input
                            type='text'
                            id='nombre'
                            {...register("nombre", { required: "El nombre es requerido" })}
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 ${errors.nombre ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Tu nombre'
                        />
                        {errors.nombre && <p className='text-red-500 font-medium text-sm'>{errors.nombre.message}</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='apellido' className='text-sm text-slate-700 font-semibold'>Apellido</label>
                        <input
                            type='text'
                            id='apellido'
                            {...register("apellido", { required: "El apellido es requerido" })}
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 ${errors.apellido ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Tu apellido'
                        />
                        {errors.apellido && <p className='text-red-500 font-medium text-sm'>{errors.apellido.message}</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='cedula' className='text-sm text-slate-700 font-semibold'>Cédula</label>
                        <input
                            type='number'
                            id='cedula'
                            {...register("cedula", {
                                required: "La cédula es requerida",
                                minLength: { value: 9, message: "Debe tener 9 dígitos" },
                                maxLength: { value: 9, message: "Debe tener 9 dígitos" }
                            })}
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 ${errors.cedula ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Tu cédula'
                            onInput={(e) => {
                                if (e.target.value.length > 9) e.target.value = e.target.value.slice(0, 9);
                            }}
                        />
                        {errors.cedula && <p className='text-red-500 font-medium text-sm'>{errors.cedula.message}</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email' className='text-sm text-slate-700 font-semibold'>Correo Electrónico</label>
                        <input
                            type='email'
                            id='email'
                            {...register("email", {
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                    message: "El correo no es válido",
                                  }
                            })}
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 ${errors.email ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Tu correo electrónico'
                        />
                        {errors.email && <p className='text-red-500 font-medium text-sm'>{errors.email.message}</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='password' className='text-sm text-slate-700 font-semibold'>Contraseña</label>
                        <input
                            type='password'
                            id='password'
                            {...register("password", {
                                required: "La contraseña es requerida",
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres"
                                }
                            })}
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 ${errors.password ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Tu contraseña'
                        />
                        {errors.password && <p className='text-red-500 font-medium text-sm'>{errors.password.message}</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='confirmPassword' className='text-sm text-slate-700 font-semibold'>Confirmar Contraseña</label>
                        <input
                            type='password'
                            id='confirmPassword'
                            {...register("confirmPassword", {
                                required: "Debes confirmar la contraseña",
                                validate: (value, { password }) =>
                                    value === watch("password") || "Las contraseñas no coinciden"
                            })}
                            className={`border-2 rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 ${errors.confirmPassword ? 'border-red-500' : 'border-[#007575]'}`}
                            placeholder='Confirma tu contraseña'
                        />
                        {errors.confirmPassword && <p className='text-red-500 font-medium text-sm'>{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                <div className='flex gap-3 items-center w-full'>
                    <input
                        type='checkbox'
                        id='terms'
                        {...register("terms", {
                            required: "Debes aceptar los términos y condiciones"
                        })}
                        className='accent-stone-800 cursor-pointer rounded-sm w-5 h-5'
                    />
                    <label htmlFor='terms' className='text-sm text-slate-700 font-semibold cursor-pointer leading-5 '>
                        He leído y acepto los{' '}
                        <a href='#' className='text-blue-700 underline capitalize'>Términos & condiciones</a>{' '}
                        y la <a href='#' className='text-blue-700 underline'>Política de privacidad</a>
                    </label>
                </div>

                {errors.terms && (
                    <p className='text-red-500 font-medium text-sm w-full'>
                        {errors.terms.message}
                    </p>
                )}

                <div className='flex flex-col gap-3 w-full'>
                    <button type='submit' className="bg-[#007575] text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out">
                        Registrarse
                    </button>
                    <button type='button' className='underline font-medium cursor-pointer' onClick={() => navigate("/Home")}>
                        Inicio
                    </button>
                </div>
            </form>

            <button 
                className="absolute top-4 left-4 bg-hoverColor text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => navigate("/LogIn")}
            >
                ← Regresar
            </button>
        </main>
    );
}

export default Registro;
