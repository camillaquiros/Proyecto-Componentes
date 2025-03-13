import { useForm } from "react-hook-form";


function App() {

    const {register, handleSubmit} = useForm();

    const onSubmit = handleSubmit (data => {
        console.log(data);
    });

	return (
		<main className='container h-screen grid place-items-center  mx-auto'>
			<form className='flex flex-col gap-5 items-center border border-slate-700 rounded-md w-full max-w-md px-8 py-10 ' 
            onSubmit={onSubmit}>
				<div className='space-y-4'>
					<h1 className='text-2xl font-bold text-center'>
						Inicio de Sesion
					</h1>
					<p className='text-slate-500 text-center'>
						Inicia sesion para comenzar agendar tus citas, 
                        en el momento que desees!
					</p>
				</div>

				<div className='space-y-3 w-full'>
				

					<div className='flex flex-col gap-2 w-full'>
						<label
							htmlFor='email'
							className='text-sm text-slate-700 font-semibold'
						>
							Correo Electrónico:
						</label>
						<input
							type='email'
							id='email'
							className={`border  rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600 `}
							placeholder='LuisMiguel@gmail.com'
                            {
                                ...register('email', )
                            }
						/>
					</div>

					<div className='flex flex-col gap-2 w-full'>
						<label
							htmlFor='password'
							className='text-sm text-slate-700 font-semibold'
						>
							Contraseña
						</label>
						<input
							type='password'
							id='password'
							className={`border  rounded-sm px-2 py-3 text-sm outline-none font-medium text-slate-600`}
							placeholder='*******'
						/>
					</div>
				</div>

				<div className='flex gap-3 items-center w-full'>
					<input
						type='checkbox'
						id='terms'
						className='accent-stone-800 cursor-pointer rounded-sm w-5 h-5'
					/>
					<label
						htmlFor='terms'
						className='text-sm text-slate-700 font-semibold cursor-pointer leading-5'
					>
						He leído y acepto los{' '}
						<a
							href='#'
							className='text-blue-700 underline capitalize'
						>
							Términos & condiciones
						</a>{' '}
						y la
						<a href='#' className='text-blue-700 underline'>
							{' '}
							política de privacidad.
						</a>
					</label>
				</div>

				<div className='flex flex-col gap-3 w-full'>
					<button
						type='submit'
						 className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
					>
						Continuar
					</button>
					<button
						type='button'
						className='underline font-medium cursor-pointer'
					>
						Registrarse
					</button>
				</div>
			</form>
		</main>
	);
}

export default App;
