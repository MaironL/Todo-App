import C from './constant';

export interface IInitialState {
  isDarkTheme: boolean;
  newTask: string;
  tasks: { todoTask: string; id: string; isCheck: boolean }[];
  filteredTask: { todoTask: string; id: string; isCheck: boolean }[];
  selectedFilter: string;
}

export const initialState: IInitialState = {
  isDarkTheme: true,
  newTask: '',
  tasks: [],
  filteredTask: [],
  selectedFilter: 'All',
};

const reducer = (state: IInitialState, { type, payload }: any) => {
  switch (type) {
    /*==============================*/
    case C.THEME_SWITCH:
      return { ...state, isDarkTheme: !state.isDarkTheme };
    /*==============================*/
    case C.CHECKIN:
      const check = state.tasks.map((toCheck) => {
        return toCheck.id === payload
          ? { ...toCheck, isCheck: !toCheck.isCheck }
          : toCheck;
      });
      return { ...state, tasks: check };
    /*==============================*/
    case C.GET_TASK:
      const newTask = payload.target.value;
      return { ...state, newTask };
    /*==============================*/
    case C.ADDING_TASK:
      if (state.newTask) {
        const id = '_' + Math.random().toString(36).slice(2);
        const taskToAdd = { todoTask: state.newTask, id, isCheck: false };
        return {
          ...state,
          newTask: '',
          tasks: [...state.tasks, taskToAdd],
        };
      } else {
        return { ...state };
      }
    /*==============================*/
    case C.UPDATE_TASK:
      const update = state.tasks.map((toUpdate) => {
        return toUpdate.id === payload.id
          ? { ...toUpdate, todoTask: payload.e.target.value }
          : toUpdate;
      });
      return { ...state, tasks: update };
    /*==============================*/
    case C.DELETE_TASK:
      const deleting = state.tasks.filter((toDelete) => toDelete.id !== payload);
      return { ...state, tasks: deleting };
    /*==============================*/
    case C.CLEAR_COMPLETED:
      const clear = state.tasks.filter((toClear) => toClear.isCheck === false);
      return { ...state, tasks: clear };
    /*==============================*/
    case C.FILTER_TASKS:
      return payload === 'Active'
        ? {
            ...state,
            filteredTask: state.tasks.filter((task) => task.isCheck === false),
            selectedFilter: 'Active',
          }
        : payload === 'Completed'
        ? {
            ...state,
            filteredTask: state.tasks.filter((task) => task.isCheck === true),
            selectedFilter: 'Completed',
          }
        : payload === 'All'
        ? { ...state, filteredTask: state.tasks, selectedFilter: 'All' }
        : { ...state, filteredTask: state.tasks };
    /*==============================*/
    case C.REORDER_TASK:
      return { ...state, tasks: payload };

    default:
      throw new Error();
  }
};

export default reducer;
