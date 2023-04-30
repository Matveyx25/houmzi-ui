import { Observable } from 'rxjs';
import {
  AddFavorite, AddFavoriteFailed, AddFavoriteSuccess, GetListing, GetListingFailed,
  GetListings,
  GetListingsFailed,
  GetListingsSuccess, GetListingSuccess, RemoveFavorite, RemoveFavoriteFailed, RemoveFavoriteSuccess,
  SearchListingsActionTypes,
} from '../actions/search-listings.actions';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, pluck } from 'rxjs/operators';
import { addFavorite, getListing, getListings, removeFavorite } from '../../services/search-listing.service';
import { IListingCard } from '../../interfaces/buy/listing-card.interface';
import { ISearchParams } from '../../interfaces/buy/search-params.interface';
import { IListing } from '../../interfaces/buy/listing.interface';

export const getListingsEpic = (action$: Observable<GetListings>) => action$.pipe(
  ofType<GetListings>(SearchListingsActionTypes.getListings),
  pluck('payload'),
  mergeMap((params: ISearchParams) =>
    getListings(params)
      .then((data: { items: IListingCard[]; total: number }) => new GetListingsSuccess(data))
      .catch(() => new GetListingsFailed()),
  ),
);

export const addFavoriteEpic = (action$: Observable<AddFavorite>) => action$.pipe(
  ofType<AddFavorite>(SearchListingsActionTypes.addFavorite),
  pluck('payload'),
  mergeMap((id: string) =>
    addFavorite(id)
      .then(() => new AddFavoriteSuccess(id))
      .catch(() => new AddFavoriteFailed()),
  ),
);

export const removeFavoriteEpic = (action$: Observable<RemoveFavorite>) => action$.pipe(
  ofType<RemoveFavorite>(SearchListingsActionTypes.removeFavorite),
  pluck('payload'),
  mergeMap((id: string) =>
    removeFavorite(id)
      .then(() => new RemoveFavoriteSuccess(id))
      .catch(() => new RemoveFavoriteFailed()),
  ),
);

export const getListingEpic = (action$: Observable<GetListing>) => action$.pipe(
  ofType<GetListing>(SearchListingsActionTypes.getListing),
  pluck('payload'),
  mergeMap((id: string) =>
    getListing(id)
      .then((listing: IListing) => new GetListingSuccess(listing))
      .catch(() => new GetListingFailed()),
  ),
);

export const searchListingsEpics = combineEpics(
  getListingsEpic,
  addFavoriteEpic,
  removeFavoriteEpic,
  getListingEpic,
);
