import useAddNewTask from './useAddNewTask';

const useEnterKey = () => {
  const { addTask } = useAddNewTask();

  const enterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      return addTask();
    }
  };

  return { enterKey };
};

export default useEnterKey;
