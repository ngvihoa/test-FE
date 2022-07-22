import { useForm, SubmitHandler } from 'react-hook-form';
import { trpc } from '../trpc';
import '../assets/css/ball-fussion.css';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

type LoginInputs = {
    username: string;
    password: string;
};

const Login = () => {
    const setToken = useAuthStore((state) => state.loginUser);
    const user = useAuthStore((state) => state.user);
    const login = trpc.useMutation('auth.signIn');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginInputs>();

    const onLogin: SubmitHandler<LoginInputs> = async (data) => {
        login.mutate(
            { ...data },
            {
                onSuccess(data, variables, context) {
                    setToken(data.token);
                },
                onError(error, variables, context) {
                    if (error.data?.code === 'UNAUTHORIZED') {
                        setError('username', {
                            message: error.message,
                            type: 'validate',
                        });
                        setError('password', {
                            message: error.message,
                            type: 'validate',
                        });
                    }
                },
            },
        );
    };

    if (user) {
        return <Navigate to='/' replace/>
    }

    return (
        <div className=" flex h-screen w-screen bg-forest bg-cover bg-no-repeat">
            <div className="flex w-full max-w-xl h-full justify-between flex-col space-y-4 rounded-xl bg-white p-8 lg:ml-48 pt-24">
                <div>
                    <h1 className="text-2xl font-semibold mb-3">Đăng nhập</h1>
                    <form
                        onSubmit={handleSubmit(onLogin)}
                        className="flex flex-col space-y-4"
                    >
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="username" className="font-thin">
                                Tên đăng nhập
                            </label>
                            <input
                                id="username"
                                aria-invalid={errors.username ? 'true' : 'false'}
                                {...register('username', {
                                    required: 'Tên đăng nhập bị thiếu',
                                })}
                                className={`rounded-md border p-2 ${
                                    errors.username
                                        ? 'border-red-500'
                                        : 'border-slate-800'
                                }`}
                            />
                            {errors.username && (
                                <span
                                    role="alert"
                                    className="text-sm font-light italic text-red-500"
                                >
                                    * {errors.username.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="font-thin">
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                aria-invalid={errors.password ? 'true' : 'false'}
                                {...register('password', {
                                    required: 'Mật khẩu bị thiếu',
                                })}
                                type="password"
                                className="rounded-md border border-slate-800 p-2"
                            />
                            {errors.password && (
                                <span
                                    role="alert"
                                    className="text-sm font-light italic text-red-500"
                                >
                                    * {errors.password.message}
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="cursor-pointer rounded-md bg-slate-800 py-2 text-white transition-colors hover:bg-slate-900"
                        >
                            <span>Đăng nhập</span>
                        </button>
                    </form>
                    {login.isLoading && (
                        <div className="flex items-center justify-center pt-2">
                            <div className="la-ball-fussion">
                                <div />
                                <div />
                                <div />
                                <div />
                            </div>
                        </div>
                    )}
                </div>
                <div className='mx-auto mt-28'>&copy; ICT Ho Chi Minh City 2022</div>
            </div>
        </div>
    );
};

export default Login;
