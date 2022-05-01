import useForm from './useForm';

const useEnterKey = () => {
  const { handleSubmit } = useForm();

  const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      return handleSubmit;
    }
  };

  return { enterKey };
};

export default useEnterKey;
