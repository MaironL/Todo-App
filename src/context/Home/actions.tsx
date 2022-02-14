import { THEME_SWITCH, CHECKIN } from './constant';

export const darkMode = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: THEME_SWITCH });
};

export const checkIn = (dispatch: React.Dispatch<any>) => () => {
  dispatch({ type: CHECKIN });
};
