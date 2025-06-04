import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { SignUpFormData, signUpSchema } from '../schemas/SignUpFormSchema';
import Input from './forms/Input';
import Button from './forms/Button';

export default function SignUp() {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    await signUp(data.name, data.email, data.password);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-5 gap-y-5">
          <div>
            <div className="mt-2">
              <Input
                {...register('name')}
                id="name"
                type="text"
                label="Full name"
                error={errors.name?.message}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <Input
                {...register('email')}
                id="email"
                type="text"
                label="Email address"
                error={errors.email?.message}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <Input
                {...register('password')}
                id="password"
                type="password"
                label="Password"
                error={errors.password?.message}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <Input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                label="Confirm password"
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>

          <div>
            <Button
              text={isSubmitting ? 'Creating account...' : 'Sign up'}
              type="submit"
              disabled={isSubmitting}
              variant='primary'
              className='w-full'
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/signin" className="font-bold tracking-tight leading-6 text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 