import { useGlobalContext } from 'context';
import { FormInput } from 'infrastructure/components';
import { useEffect } from 'react';
import { useForm } from './signInHooks';

const SignIn = () => {
  const { values, errors, disableSubmit, setValues, handleSubmit, handleChange } = useForm();
  const { toLocalStorage, C, dispatch } = useGlobalContext();

  const trustDevice = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: C.TRUST_DEVICE, payload: e.target.checked });
  };

  useEffect(() => {
    localStorage.setItem('ToDo', JSON.stringify(toLocalStorage));
  }, [toLocalStorage]);

  return (
    <div
      className={`w-full py-[35px] h-full relative bg-no-repeat bg-top bg-contain  pb-[4.4rem] sm:pb-[2rem]  ${
        toLocalStorage.isDarkTheme
          ? 'bg-[#161620] bg-mobileDarkTheme sm:bg-desktopDarkTheme'
          : 'bg-[#fafafa] bg-mobileLightTheme sm:bg-desktopLightTheme'
      } px-6 flex flex-col items-center justify-center`}
    >
      <div className='flex flex-col sm:flex-row w-full max-w-[600px]'>
        <div className='w-full sm:w-2/5 bg-gradient-to-l from-indigo-600 to-fuchsia-600 sm:bg-no-repeat sm:bg-cover sm:bg-form rounded-t-md sm:rounded-tr-none sm:rounded-tl-[50px]'>
          <h1 className='text-center mt-4 text-white text-4xl font-semibold tracking-wide drop-shadow-lg mb-4'>
            {values.isLogin ? 'Login' : 'Register'}
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className='w-full pt-6  sm:py-8 sm:w-3/5 px-6 bg-slate-100 rounded-b-md sm:rounded-bl-none sm:rounded-br-[50px]  flex flex-col items-center justify-center '
        >
          {!values.isLogin && (
            <FormInput
              id='name'
              name='name'
              placeholder='Name'
              type='text'
              ariaLabel='name'
              value={values.name}
              errorMessage={errors.name}
              onChange={handleChange}
            />
          )}
          <FormInput
            id='email'
            name='email'
            placeholder='Email'
            type='email'
            ariaLabel='email'
            value={values.email}
            errorMessage={errors.email}
            onChange={handleChange}
          />
          <FormInput
            id='password'
            name='password'
            placeholder='Password'
            type='password'
            ariaLabel='password'
            autoComplete={values.isLogin ? 'current-password' : 'new-password'}
            value={values.password}
            errorMessage={errors.password}
            onChange={handleChange}
          />
          {!values.isLogin && (
            <FormInput
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirm Password'
              type='password'
              ariaLabel='Confirm Password'
              autoComplete='new-password'
              value={values.confirmPassword}
              errorMessage={errors.confirmPassword}
              onChange={handleChange}
            />
          )}
          <FormInput
            id='trusted'
            name='trusted'
            type='checkbox'
            label={`I am ${values.isLogin ? 'logging' : 'registering'} from a trusted device`}
            onChange={trustDevice}
            checked={toLocalStorage.trustDevice ? true : false}
          />

          <button
            disabled={disableSubmit}
            className='bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 transition-colors mt-[15px] text-white p-[10px] rounded border-2 border-indigo-300 w-full font-semibold tracking-wide'
          >
            {values.isLogin ? 'Login' : 'Register'}
          </button>
          <p
            onClick={() => setValues({ ...values, isLogin: !values.isLogin })}
            className='mt-5 font-medium pb-6 sm:pb-0 hover:cursor-pointer'
          >
            {values.isLogin ? 'Create an account' : 'Already have an account?'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
