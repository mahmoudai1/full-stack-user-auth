import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { SignInFormData, signInSchema } from '../schemas/SignInFormSchema';
import Input from './forms/Input';
import Button from './forms/Button';

export default function SignIn() {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    await signIn(data.email, data.password);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-5 gap-y-5">
          <div>
            <div className="mt-2">
              <Input
                {...register('email')}
                label="Email address"
                id="email"
                type="email"
                error={errors.email?.message}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <Input
                {...register('password')}
                label="Password"
                id="password"
                type="password"
                error={errors.password?.message}
              />
            </div>
          </div>

          <div>
            <Button
              text={isSubmitting ? 'Signing in...' : 'Sign in'}
              type="submit"
              disabled={isSubmitting}
              variant='primary'
              className='w-full'
              />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/signup" className="font-bold tracking-tight leading-6 text-blue-600 hover:text-blue-500">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
} 