import { IRootState } from '../reducers';
import { createSelector } from 'reselect';

const _lang = (state: IRootState) => state.lang;

export const lang = createSelector(
  _lang,
  (lang: string) => lang,
);
