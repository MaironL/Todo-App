export interface CI {
  THEME_SWITCH: string;
  GET_USER_AUTH: string;
  LOGOUT: string;
  CLEAN_LIST: string;
  SET_LOADING: string;
  TRUST_DEVICE: string;
  GET_ALL_TASKS: string;
  ADD_NEW_TASK: string;
  UPDATE_TASK: string;
  DELETE_TASK: string;
  FILTER_TASKS: string;
  REORDER_TASK: string;
}

const C: CI = {
  THEME_SWITCH: 'THEME_SWITCH',
  GET_USER_AUTH: ' GET_USER_AUTH',
  LOGOUT: 'LOGOUT',
  CLEAN_LIST: 'CLEAN_LIST',
  SET_LOADING: 'LOADING',
  TRUST_DEVICE: 'TRUST_DEVICE',
  GET_ALL_TASKS: 'GET_ALL_TASKS',
  ADD_NEW_TASK: 'ADD_NEW_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  FILTER_TASKS: 'FILTER_TASKS',
  REORDER_TASK: 'REORDER_TASK',
};

export default C;
