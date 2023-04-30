import { Observable } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, pluck } from 'rxjs/operators';
import {
  AddFavorite,
  AddFavoriteFailed,
  AddFavoriteSuccess,
  CountryActionTypes, RemoveFavorite, RemoveFavoriteFailed, RemoveFavoriteSuccess,
} from '../actions/country.actions';
import { addFavorite, removeFavorite } from '../../services/search-listing.service';

const addFavoriteEpic = (action$: Observable<AddFavorite>) => action$.pipe(
  ofType<AddFavorite>(CountryActionTypes.addFavorite),
  pluck('payload'),
  mergeMap((id: string) =>
    addFavorite(id)
      .then(() => new AddFavoriteSuccess(id))
      .catch(() => new AddFavoriteFailed()),
  ),
);

const removeFavoriteEpic = (action$: Observable<RemoveFavorite>) => action$.pipe(
  ofType<RemoveFavorite>(CountryActionTypes.removeFavorite),
  pluck('payload'),
  mergeMap((id: string) =>
    removeFavorite(id)
      .then(() => new RemoveFavoriteSuccess(id))
      .catch(() => new RemoveFavoriteFailed()),
  ),
);

export const countryEpics = combineEpics(
  addFavoriteEpic,
  removeFavoriteEpic,
);
