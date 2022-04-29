import { useEffect, useState } from 'react';
import validation from './validation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from 'context';
import axios from 'infrastructure/api/axios';

const useForm = () => {
  const { dispatch, C } = useGlobalContext();
  type LocationProps = {
    state: {
      from: Location;
    };
  };
  const location = useLocation() as unknown as LocationProps;
  const navigate = useNavigate();

  //inputs state
  const [values, setValues] = useState({
    isLogin: true,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //inputs errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: C.SET_LOADING, payload: true });
    const data = values.isLogin
      ? { email: values.email, password: values.password }
      : { name: values.name, email: values.email, password: values.password };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ROOT_ENDPOINT}${
          values.isLogin ? '/authN/login' : '/authN/register'
        }`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      dispatch({
        type: C.GET_USER_AUTH,
        payload: {
          token: response.data.accessToken,
          name: response.data.user.name,
          role: Object.keys(response.data.user.role)[0],
        },
      });

      navigate(location?.state?.from || '/', { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
    dispatch({ type: C.SET_LOADING, payload: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((prevFormData) => {
      return { ...prevFormData, [name]: type === 'checkbox' ? checked : value };
    });
  };

  useEffect(() => {
    setErrors(validation(values));
  }, [values]);

  useEffect(() => {
    setDisableSubmit(Object.values(errors).some((error) => error !== ''));
  }, [errors]);

  return {
    values,
    errors,
    disableSubmit,
    setValues,
    handleSubmit,
    handleChange,
  };
};

export default useForm;
