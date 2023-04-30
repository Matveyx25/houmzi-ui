import { SavedSearchesActions, SavedSearchesActionTypes } from '../actions/saved-searches.actions';
import { ISavedSearch } from '../../interfaces/saved-searches/saved-search.interface';

export function reducer(state: ISavedSearch[] = [], actions: SavedSearchesActions) {
  switch (actions.type) {
    case SavedSearchesActionTypes.getSavedSearchesSuccess:
      return actions.payload;
    case SavedSearchesActionTypes.renameSavedSearchSuccess:
      return state.map((item: ISavedSearch) => {
        if (item.id === actions.payload.id) {
          item.name = actions.payload.name;
        }
        return item;
      });
    case SavedSearchesActionTypes.deleteSavedSearchSuccess:
      return state.filter((item: ISavedSearch) => item.id !== actions.payload);
    default:
      return state;
  }
}
