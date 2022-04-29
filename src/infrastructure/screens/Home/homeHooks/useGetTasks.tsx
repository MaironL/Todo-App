import { useState } from 'react';
import { useGlobalContext } from 'context';
import useAxiosPrivate from 'infrastructure/Auth/useAxiosPrivate';

const useGetTasks = () => {
  const { C, dispatch } = useGlobalContext();
  const { axiosPrivate } = useAxiosPrivate();
  const [isMounted, setIsMounted] = useState(false);
  const controller = new AbortController();

  const getTasks = async () => {
    setIsMounted(true);

    try {
      const response = await axiosPrivate.get(`/tasks`, { signal: controller.signal });
      console.log('the tasks: ', response.data);
      //the next thing todo here is to add the data to the store
      //with the new dispatch
      isMounted && console.log('The tasks can be dispatched');
    } catch (error) {
      console.log(error);
    }
  };

  return { controller, setIsMounted, getTasks };
};

export default useGetTasks;
