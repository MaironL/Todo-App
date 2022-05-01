import C from './constant';

export interface IInitialState {
  userAuth: { token: string; name: string; role: string };
  isLoading: boolean;
  listStatus: string;
  tasksList: { task: string; _id: string; isCheck: boolean }[];
  filteredTask: { task: string; _id: string; isCheck: boolean }[];
  toLocalStorage: {
    trustDevice: boolean; //dejar
    isDarkTheme: boolean; //dejar
    selectedFilter: string; //quitar
  };
}

export const initialState: IInitialState = {
  userAuth: { token: '', name: '', role: '' },
  isLoading: false,
  listStatus: '',
  tasksList: [],
  filteredTask: [],
  toLocalStorage: {
    trustDevice: false,
    isDarkTheme: true,
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

    case C.CLEAN_LIST:
      return { ...state, tasksList: [], filteredTask: [] };
    /*==============================*/

    case C.SET_LOADING:
      return { ...state, isLoading: payload };

    /*==============================*/
    case C.TRUST_DEVICE:
      return { ...state, toLocalStorage: { ...state.toLocalStorage, trustDevice: payload } };

    /*==============================*/
    case C.GET_ALL_TASKS:
      return { ...state, listStatus: 'updated', tasksList: payload };
    /*==============================*/

    case C.ADD_NEW_TASK:
      return { ...state, listStatus: 'taskAdded' };
    /*==============================*/

    case C.DELETE_TASK:
      return { ...state, listStatus: 'taskDeleted' };
    /*==============================*/

    case C.UPDATE_TASK:
      return { ...state, listStatus: 'taskUpdated' };

    /*==============================*/

    case C.FILTER_TASKS:
      return payload === 'Active'
        ? {
            ...state,
            filteredTask: state.tasksList.filter((toFilter) => toFilter.isCheck === false),
            toLocalStorage: {
              ...state.toLocalStorage,
              selectedFilter: 'Active',
            },
          }
        : payload === 'Completed'
        ? {
            ...state,
            filteredTask: state.tasksList.filter((toFilter) => toFilter.isCheck === true),
            toLocalStorage: {
              ...state.toLocalStorage,
              selectedFilter: 'Completed',
            },
          }
        : payload === 'All'
        ? {
            ...state,
            filteredTask: state.tasksList,
            toLocalStorage: {
              ...state.toLocalStorage,
              selectedFilter: 'All',
            },
          }
        : {
            ...state,
            filteredTask: state.tasksList,
          };

    /*==============================*/
    case C.REORDER_TASK:
      return { ...state, tasksList: payload };

    default:
      throw new Error();
  }
};

export default reducer;
