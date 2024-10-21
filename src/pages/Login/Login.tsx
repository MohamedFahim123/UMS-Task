import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './login.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { baseUrl } from '../../utils/baseUrl';

interface loginSchema {
    username: string,
    password: string,
};
interface LoginResponse {
    accessToken: string;
};

export default function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<loginSchema>();

    const onSubmit: SubmitHandler<loginSchema> = async (data: loginSchema): Promise<void> => {
        try {
            const response = await axios.post<LoginResponse>(`${baseUrl}/users/login`, data);
            Cookies.set('authToken', response.data.accessToken, { expires: 999999999999999 });
            toast.success("Logged in Successfully!");
            navigate('/dashboard/home');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Something went wrong!';
                toast.error(errorMessage);
            } else {
                toast.error('Unexpected error occurred!');
            };
        };
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.loginHeader}>
                    <h1>User Management System</h1>
                </div>
                <div className={styles.loginDescription}>
                    <h3>Sign In</h3>
                    <p>Enter your credentials to access your account</p>
                </div>
                <div className={styles.loginInputContainer}>
                    <label htmlFor="loginusername" className='mb-3'>UserName</label>
                    <input
                        type="text"
                        id="loginusername"
                        placeholder='Enter your username'
                        {...register('username', {
                            required: "username is required"
                        })}
                        className={`form-control ${errors?.username?.message ? 'input_error' : ''}`}
                    />
                    {
                        errors?.username?.message &&
                        <span className='error_message'>{errors?.username?.message}</span>
                    }
                </div>
                <div className={styles.loginInputContainer}>
                    <label htmlFor="loginPassword" className='mb-3'>Password</label>
                    <input
                        type="password"
                        id="loginPassword"
                        placeholder='Enter your Password'
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })}
                        className={`form-control ${errors?.password?.message ? 'input_error' : ''}`}
                    />
                    {
                        errors?.password?.message &&
                        <span className='error_message'>{errors?.password?.message}</span>
                    }
                </div>
                <div className={styles.formSubmitBtn}>
                    <input disabled={isSubmitting} type="submit" value="Sign In" />
                </div>
            </form>
        </div>
    )
}
