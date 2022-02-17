import React, { useContext, useReducer, createContext } from 'react';
import reducer, { initialState, IInitialState } from 'context/Home/reducer';
import C, { CI } from './Home/constant';

//CreateContext Interface
interface IAppContext extends IInitialState {
  dispatch: React.Dispatch<any>;
  C: CI;
  state: IInitialState;
}

//The Create Context
const AppContext = createContext<IAppContext>({
  ...initialState,
  dispatch: () => null,
  C,
  state: initialState,
});

const AppProvider = ({ children }: any) => {
  const localState = localStorage.getItem('state');
  const [state, dispatch] = useReducer(
    reducer,
    (localState !== null && JSON.parse(localState)) || initialState
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
        state,
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
