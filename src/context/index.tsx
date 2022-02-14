import React, { useContext, useReducer, createContext } from 'react';
import reducer, { initialState, IInitialState } from 'context/Home/reducer';
import { darkMode, checkIn } from 'context/Home/actions';

//CreateContext Interface
interface IAppContext extends IInitialState {
  dispatch: React.Dispatch<any>;
  darkMode: (dispatch: React.Dispatch<any>) => () => void;
  checkIn: (dispatch: React.Dispatch<any>) => () => void;
}

//The Create Context
const AppContext = createContext<IAppContext>({
  ...initialState,
  dispatch: () => null,
  darkMode,
  checkIn,
});

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch, darkMode, checkIn }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
