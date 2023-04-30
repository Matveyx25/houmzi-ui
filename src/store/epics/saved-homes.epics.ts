import { Observable } from 'rxjs';
import {
  AddFavorite, AddFavoriteFailed, AddFavoriteSuccess,
  GetListings,
  GetListingsFailed,
  GetListingsSuccess, RemoveFavorite, RemoveFavoriteFailed, RemoveFavoriteSuccess,
  SavedHomesActionTypes,
} from '../actions/saved-homes.actions';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, pluck } from 'rxjs/operators';
import { getListings } from '../../services/saved-homes.service';
import { IListingCard } from '../../interfaces/buy/listing-card.interface';
import { addFavorite, removeFavorite } from '../../services/search-listing.service';

export const getListingsEpic = (action$: Observable<GetListings>) => action$.pipe(
  ofType<GetListings>(SavedHomesActionTypes.getListings),
  mergeMap(() =>
    getListings(null)
      .then((listings: IListingCard[]) => new GetListingsSuccess(listings))
      .catch(() => new GetListingsFailed()),
  ),
);

export const addFavoriteEpic = (action$: Observable<AddFavorite>) => action$.pipe(
  ofType<AddFavorite>(SavedHomesActionTypes.addFavorite),
  pluck('payload'),
  mergeMap((id: string) =>
    addFavorite(id)
      .then(() => new AddFavoriteSuccess(id))
      .catch(() => new AddFavoriteFailed()),
  ),
);

export const removeFavoriteEpic = (action$: Observable<RemoveFavorite>) => action$.pipe(
  ofType<RemoveFavorite>(SavedHomesActionTypes.removeFavorite),
  pluck('payload'),
  mergeMap((id: string) =>
    removeFavorite(id)
      .then(() => new RemoveFavoriteSuccess(id))
      .catch(() => new RemoveFavoriteFailed()),
  ),
);

export const savedHomesEpics = combineEpics(
  getListingsEpic,
  addFavoriteEpic,
  removeFavoriteEpic,
);
