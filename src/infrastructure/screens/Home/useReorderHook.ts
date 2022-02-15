import { useGlobalContext } from 'context';

const useReorderHook = () => {
  const { reorderTask, dispatch } = useGlobalContext();

  const reorder = (list: any, srcIndex: any, destIndex: any) => {
    const result = [...list];
    const [remove] = result.splice(srcIndex, 1);
    result.splice(destIndex, 0, remove);
    reorderTask(dispatch, result);
  };

  return { reorder };
};

export default useReorderHook;
