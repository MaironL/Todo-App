import React, { useContext, useReducer, createContext } from 'react';
import reducer, { initialState, IInitialState } from 'context/Home/reducer';
import C, { CI } from './Home/constant';

//CreateContext Interface
interface IAppContext extends IInitialState {
  dispatch: React.Dispatch<any>;
  C: CI;
}

//The Create Context
const AppContext = createContext<IAppContext>({
  ...initialState,
  dispatch: () => null,
  C,
});

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        C,
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
