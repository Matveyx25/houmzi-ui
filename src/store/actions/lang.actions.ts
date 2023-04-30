import { Action } from 'redux';

export enum LangActionTypes {
  setLanguage = '[Lang] Set Language',
}

export class SetLanguage implements Action {
  readonly type = LangActionTypes.setLanguage;

  constructor(public payload: string) {
  }
}

export type LangActions =
  | SetLanguage
  ;
