import C from './constant';

export interface IInitialState {
  userAuth: { token: string; name: string; role: string };
  isLoading: boolean;
  tasksList: any[];
  toLocalStorage: {
    trustDevice: boolean; //dejar
    isDarkTheme: boolean; //dejar
    newTask: string; //quitar
    tasks: { todoTask: string; id: string; isCheck: boolean }[]; //quitar
    filteredTask: { todoTask: string; id: string; isCheck: boolean }[]; //quitar
    selectedFilter: string; //quitar
  };
}

export const initialState: IInitialState = {
  userAuth: { token: '', name: '', role: '' },
  isLoading: false,
  tasksList: [],
  toLocalStorage: {
    trustDevice: false,
    isDarkTheme: true,
    newTask: '',
    tasks: [],
    filteredTask: [],
    selectedFilter: 'All',
  },
};

const reducer = (state: IInitialState, { type, payload }: any) => {
  switch (type) {
    /*==============================*/
    case C.THEME_SWITCH:
      return {
        ...state,
        toLocalStorage: { ...state.toLocalStorage, isDarkTheme: !state.toLocalStorage.isDarkTheme },
      };
    /*==============================*/

    case C.GET_USER_AUTH:
      return { ...state, userAuth: payload };
    /*==============================*/

    case C.LOGOUT:
      return { ...state, userAuth: { token: '', name: '', role: '' } };
    /*==============================*/

    case C.SET_LOADING:
      return { ...state, isLoading: payload };

    /*==============================*/
    case C.TRUST_DEVICE:
      return { ...state, toLocalStorage: { ...state.toLocalStorage, trustDevice: payload } };

    //!==============CHANGE-FROM-HERE===============*/

    case C.CHECKIN:
      const check = state.toLocalStorage.tasks.map((toCheck) => {
        return toCheck.id === payload ? { ...toCheck, isCheck: !toCheck.isCheck } : toCheck;
      });
      return { ...state, toLocalStorage: { ...state.toLocalStorage, tasks: check } };
    /*==============================*/

    case C.GET_TASK:
      const newTask = payload.target.value;
      return { ...state, toLocalStorage: { ...state.toLocalStorage, newTask } };
    /*==============================*/

    case C.ADDING_TASK:
      // if (state.toLocalStorage.newTask) {
      //   const id = '_' + Math.random().toString(36).slice(2);
      //   const taskToAdd = { todoTask: state.toLocalStorage.newTask, id, isCheck: false };
      //   return {
      //     ...state,
      //     toLocalStorage: {
      //       ...state.toLocalStorage,
      //       newTask: '',
      //       tasks: [...state.toLocalStorage.tasks, taskToAdd],
      //     },
      //   };
      // } else {
      //   return { ...state };
      // }
      return { ...state, tasksList: payload };

    /*==============================*/
    case C.UPDATE_TASK:
      const update = state.toLocalStorage.tasks.map((toUpdate) => {
        return toUpdate.id === payload.id ? { ...toUpdate, todoTask: payload.updated } : toUpdate;
      });
      return { ...state, toLocalStorage: { ...state.toLocalStorage, tasks: update } };

    /*==============================*/
    case C.DELETE_TASK:
      const deleting = state.toLocalStorage.tasks.filter((toDelete) => toDelete.id !== payload);
      return { ...state, toLocalStorage: { ...state.toLocalStorage, tasks: deleting } };

    //!===========TO-HERE===================*/
    case C.CLEAR_COMPLETED:
      const clear = state.toLocalStorage.tasks.filter((toClear) => toClear.isCheck === false);
      return { ...state, toLocalStorage: { ...state.toLocalStorage, tasks: clear } };

    /*==============================*/
    case C.FILTER_TASKS:
      return payload === 'Active'
        ? {
            ...state,
            toLocalStorage: {
              ...state.toLocalStorage,
              filteredTask: state.toLocalStorage.tasks.filter(
                (toFilter) => toFilter.isCheck === false
              ),
              selectedFilter: 'Active',
            },
          }
        : payload === 'Completed'
        ? {
            ...state,
            toLocalStorage: {
              ...state.toLocalStorage,
              filteredTask: state.toLocalStorage.tasks.filter(
                (toFilter) => toFilter.isCheck === true
              ),
              selectedFilter: 'Completed',
            },
          }
        : payload === 'All'
        ? {
            ...state,
            toLocalStorage: {
              ...state.toLocalStorage,
              filteredTask: state.toLocalStorage.tasks,
              selectedFilter: 'All',
            },
          }
        : {
            ...state,
            toLocalStorage: { ...state.toLocalStorage, filteredTask: state.toLocalStorage.tasks },
          };

    /*==============================*/
    case C.REORDER_TASK:
      return { ...state, toLocalStorage: { ...state.toLocalStorage, tasks: payload } };

    default:
      throw new Error();
  }
};

export default reducer;
