import { Action } from 'redux';
import { ISavedSearch } from '../../interfaces/saved-searches/saved-search.interface';
import { ISaveSearchParams } from '../../interfaces/buy/save-search-params.interface';

export enum SavedSearchesActionTypes {
  saveSearch = '[Saved Searches] Save Search',
  saveSearchSuccess = '[Saved Searches] Save Search Success',
  saveSearchFailed = '[Saved Searches] Save Search Failed',

  getSavedSearches = '[Saved Searches] Get Saved Searches',
  getSavedSearchesSuccess = '[Saved Searches] Get Saved Searches Success',
  getSavedSearchesFailed = '[Saved Searches] Get Saved Searches Failed',

  renameSavedSearch = '[Saved Searches] Rename Saved Search',
  renameSavedSearchSuccess = '[Saved Searches] Rename Saved Search Success',
  renameSavedSearchFailed = '[Saved Searches] Rename Saved Search Failed',

  deleteSavedSearch = '[Saved Searches] Delete Saved Search',
  deleteSavedSearchSuccess = '[Saved Searches] Delete Saved Search Success',
  deleteSavedSearchFailed = '[Saved Searches] Delete Saved Search Failed',
}

export class SaveSearch implements Action {
  readonly type = SavedSearchesActionTypes.saveSearch;

  constructor(public payload: ISaveSearchParams) {
  }
}

export class SaveSearchSuccess implements Action {
  readonly type = SavedSearchesActionTypes.saveSearchSuccess;
}

export class SaveSearchFailed implements Action {
  readonly type = SavedSearchesActionTypes.saveSearchFailed;
}

export class GetSavedSearches implements Action {
  readonly type = SavedSearchesActionTypes.getSavedSearches;
}

export class GetSavedSearchesSuccess implements Action {
  readonly type = SavedSearchesActionTypes.getSavedSearchesSuccess;

  constructor(public payload: ISavedSearch[]) {
  }
}

export class GetSavedSearchesFailed implements Action {
  readonly type = SavedSearchesActionTypes.getSavedSearchesFailed;
}

export class RenameSavedSearch implements Action {
  readonly type = SavedSearchesActionTypes.renameSavedSearch;

  constructor(public payload: { id: string, name: string }) {
  }
}

export class RenameSavedSearchSuccess implements Action {
  readonly type = SavedSearchesActionTypes.renameSavedSearchSuccess;

  constructor(public payload: { id: string, name: string }) {
  }
}

export class RenameSavedSearchFailed implements Action {
  readonly type = SavedSearchesActionTypes.renameSavedSearchFailed;
}

export class DeleteSavedSearch implements Action {
  readonly type = SavedSearchesActionTypes.deleteSavedSearch;

  constructor(public payload: string) {
  }
}

export class DeleteSavedSearchSuccess implements Action {
  readonly type = SavedSearchesActionTypes.deleteSavedSearchSuccess;

  constructor(public payload: string) {
  }
}

export class DeleteSavedSearchFailed implements Action {
  readonly type = SavedSearchesActionTypes.deleteSavedSearchFailed;
}

export type SavedSearchesActions =
  | SaveSearch
  | SaveSearchSuccess
  | SaveSearchFailed
  | GetSavedSearches
  | GetSavedSearchesSuccess
  | GetSavedSearchesFailed
  | RenameSavedSearch
  | RenameSavedSearchSuccess
  | RenameSavedSearchFailed
  | DeleteSavedSearch
  | DeleteSavedSearchSuccess
  | DeleteSavedSearchFailed
  ;
