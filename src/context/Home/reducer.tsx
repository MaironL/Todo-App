import {
  THEME_SWITCH,
  CHECKIN,
  ADDING_TASK,
  GET_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from './constant';

export interface IInitialState {
  isDarkTheme: boolean;
  newTask: string;
  tasks: { todoTask: string; id: string; isCheck: boolean }[];
}

export const initialState: IInitialState = {
  isDarkTheme: false,
  newTask: '',
  tasks: [],
};

const reducer = (state: IInitialState, { type, payload }: any) => {
  switch (type) {
    /*==============================*/
    case THEME_SWITCH:
      return { ...state, isDarkTheme: !state.isDarkTheme };

    case CHECKIN:
      const check = state.tasks.map((toCheck) => {
        if (toCheck.id === payload) {
          return { ...toCheck, isCheck: !toCheck.isCheck };
        }
        return toCheck;
      });
      return { ...state, tasks: check };

    case GET_TASK:
      return { ...state, newTask: payload };

    case ADDING_TASK:
      if (state.newTask) {
        let id = '_' + Math.random().toString(36).slice(2);
        return {
          ...state,
          tasks: [...state.tasks, { todoTask: state.newTask, id, isCheck: false }],
        };
      } else {
        return { ...state };
      }

    case UPDATE_TASK:
      const update = state.tasks.map((toUpdate) => {
        if (toUpdate.id === payload.id) {
          return { ...toUpdate, todoTask: payload.updatedTask };
        }
        return toUpdate;
      });
      return { ...state, tasks: update };

    case DELETE_TASK:
      const deleting = state.tasks.filter((toDelete) => toDelete.id !== payload);

      return { ...state, tasks: deleting };

    default:
      throw new Error();
  }
};

export default reducer;
