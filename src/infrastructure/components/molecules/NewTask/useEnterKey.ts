import { useGlobalContext } from 'context';

const useEnterKey = () => {
  const { dispatch, C } = useGlobalContext();

  const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch({ type: C.ADDING_TASK });
    }
  };

  return { enterKey };
};

export default useEnterKey;
