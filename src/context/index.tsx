import React, { useContext, useReducer, createContext } from 'react';
import reducer, { initialState, IInitialState } from 'context/Home/reducer';
import {
  darkMode,
  checkIn,
  addTask,
  getTask,
  updateTask,
  deleteTask,
} from 'context/Home/actions';

//CreateContext Interface
interface IAppContext extends IInitialState {
  dispatch: React.Dispatch<any>;
  darkMode: (dispatch: React.Dispatch<any>) => () => void;
  checkIn: (dispatch: React.Dispatch<any>, id: string) => () => void;
  addTask: (dispatch: React.Dispatch<any>) => () => void;
  getTask: (
    dispatch: React.Dispatch<any>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  updateTask: (
    dispatch: React.Dispatch<any>,
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  deleteTask: (dispatch: React.Dispatch<any>, id: string) => () => void;
}

//The Create Context
const AppContext = createContext<IAppContext>({
  ...initialState,
  dispatch: () => null,
  darkMode,
  checkIn,
  addTask,
  getTask,
  updateTask,
  deleteTask,
});

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        darkMode,
        checkIn,
        addTask,
        getTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
