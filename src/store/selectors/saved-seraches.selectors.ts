import { IRootState } from '../reducers';
import { createSelector } from 'reselect';
import { ISavedSearch } from '../../interfaces/saved-searches/saved-search.interface';

const _savedSearches = (state: IRootState) => state.savedSearches;

export const savedSearches = createSelector(
  _savedSearches,
  (savedSearches: ISavedSearch[]) => savedSearches,
);
