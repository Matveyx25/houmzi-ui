import { LangActions, LangActionTypes } from '../actions/lang.actions';

const initialState: string = typeof window !== "undefined" && localStorage.getItem('lang') || 'ru';

export function reducer(state: string = initialState, actions: LangActions) {
  switch (actions.type) {
    case LangActionTypes.setLanguage:
      localStorage.setItem('lang', 'ru');
      return 'ru';
    default:
      return state;
  }
}
