import { useGlobalContext } from 'context';

const useReorderHook = () => {
  const { C, dispatch } = useGlobalContext();

  const reorder = (list: any, srcIndex: any, destIndex: any) => {
    const result = [...list];
    const [remove] = result.splice(srcIndex, 1);
    result.splice(destIndex, 0, remove);

    //? DEBO HACER UN PUT AQUI PARA QUE SE ACTUALICE LA BASE DE DATOS CADA VEZ QUE SE REORDENA
    //tal vez una accion

    dispatch({ type: C.REORDER_TASK, payload: result });
  };

  return { reorder };
};

export default useReorderHook;
