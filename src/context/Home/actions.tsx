import {
  THEME_SWITCH,
  CHECKIN,
  ADDING_TASK,
  GET_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from './constant';

export const darkMode = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: THEME_SWITCH });
};

export const checkIn = (dispatch: React.Dispatch<any>, id: string) => () => {
  dispatch({ type: CHECKIN, payload: id });
};

export const getTask = (
  dispatch: React.Dispatch<any>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  let newTask = e.target.value;
  dispatch({ type: GET_TASK, payload: newTask });
};

export const addTask = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: ADDING_TASK });
  dispatch({ type: GET_TASK, payload: '' });
};

export const updateTask = (
  dispatch: React.Dispatch<any>,
  id: string,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  let updatedTask = e.target.value;
  dispatch({ type: UPDATE_TASK, payload: { id, updatedTask } });
};

export const deleteTask = (dispatch: React.Dispatch<any>, id: string) => () => {
  dispatch({ type: DELETE_TASK, payload: id });
};
