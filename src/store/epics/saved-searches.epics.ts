import { Observable } from 'rxjs';
import {
  DeleteSavedSearch, DeleteSavedSearchFailed, DeleteSavedSearchSuccess,
  GetSavedSearches, GetSavedSearchesFailed, GetSavedSearchesSuccess,
  RenameSavedSearch, RenameSavedSearchFailed, RenameSavedSearchSuccess,
  SavedSearchesActionTypes,
  SaveSearch, SaveSearchFailed, SaveSearchSuccess,
} from '../actions/saved-searches.actions';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, pluck } from 'rxjs/operators';
import {
  deleteSavedSearch,
  getSavedSearches,
  renameSavedSearch,
  saveSearch,
} from '../../services/saved-searches.service';
import { ISaveSearchParams } from '../../interfaces/buy/save-search-params.interface';
import { ISavedSearch } from '../../interfaces/saved-searches/saved-search.interface';

export const saveSearchEpic = (action$: Observable<SaveSearch>) => action$.pipe(
  ofType<SaveSearch>(SavedSearchesActionTypes.saveSearch),
  pluck('payload'),
  mergeMap((params: ISaveSearchParams) =>
    saveSearch(params)
      .then(() => new SaveSearchSuccess())
      .catch(() => new SaveSearchFailed()),
  ),
);

export const getSavedSearchesEpic = (action$: Observable<GetSavedSearches>) => action$.pipe(
  ofType<GetSavedSearches>(SavedSearchesActionTypes.getSavedSearches),
  mergeMap(() =>
    getSavedSearches()
      .then((listings: ISavedSearch[]) => new GetSavedSearchesSuccess(listings))
      .catch(() => new GetSavedSearchesFailed()),
  ),
);

export const renameSavedSearchEpic = (action$: Observable<RenameSavedSearch>) => action$.pipe(
  ofType<RenameSavedSearch>(SavedSearchesActionTypes.renameSavedSearch),
  pluck('payload'),
  mergeMap((params: { id: string, name: string }) =>
    renameSavedSearch(params)
      .then(() => new RenameSavedSearchSuccess(params))
      .catch(() => new RenameSavedSearchFailed()),
  ),
);

export const deleteSavedSearchEpic = (action$: Observable<DeleteSavedSearch>) => action$.pipe(
  ofType<DeleteSavedSearch>(SavedSearchesActionTypes.deleteSavedSearch),
  pluck('payload'),
  mergeMap((id: string) =>
    deleteSavedSearch(id)
      .then(() => new DeleteSavedSearchSuccess(id))
      .catch(() => new DeleteSavedSearchFailed()),
  ),
);

export const savedSearchesEpics = combineEpics(
  saveSearchEpic,
  getSavedSearchesEpic,
  renameSavedSearchEpic,
  deleteSavedSearchEpic,
);
