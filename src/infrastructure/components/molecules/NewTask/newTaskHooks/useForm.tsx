import { useState } from 'react';
import useAddNewTask from './useAddNewTask';

const useForm = () => {
  const [taskWrited, setTaskWrited] = useState('');
  const { addTask } = useAddNewTask();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(taskWrited);
    setTaskWrited('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskWrited(e.target.value);
  };

  return { handleSubmit, handleChange, taskWrited };
};

export default useForm;
