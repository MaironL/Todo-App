import { THEME_SWITCH, CHECKIN } from './constant';

const markupData = [
  { todoTask: 'Complete online Javascript course' },
  { todoTask: 'Jog around the park' },
  { todoTask: '10 minutes meditation' },
  { todoTask: 'Read for 1 hour' },
  { todoTask: 'Pick up groceries' },
  { todoTask: 'Complete Todo App on FrontEnd Mentor' },
];

export interface IInitialState {
  isCheck: boolean;
  isDarkTheme: boolean;
  markup: { todoTask: string }[];
}

export const initialState: IInitialState = {
  isCheck: false,
  isDarkTheme: false,
  markup: markupData,
};

const reducer = (state: IInitialState, { type, payload }: any) => {
  switch (type) {
    /*==============================*/
    case THEME_SWITCH:
      return { ...state, isDarkTheme: !state.isDarkTheme };

    case CHECKIN:
      return { ...state, isCheck: !state.isCheck };

    default:
      throw new Error();
  }
};

export default reducer;
