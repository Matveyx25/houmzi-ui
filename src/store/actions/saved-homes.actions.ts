import { Action } from 'redux';
import { IListingCard } from '../../interfaces/buy/listing-card.interface';

export enum SavedHomesActionTypes {
  getListings = '[Saved Homes] Get Listings',
  getListingsSuccess = '[Saved Homes] Get Listings Success',
  getListingsFailed = '[Saved Homes] Get Listings Failed',

  addFavorite = '[Saved Homes] Add Favorite',
  addFavoriteSuccess = '[Saved Homes] Add Favorite Success',
  addFavoriteFailed = '[Saved Homes] Add Favorite Failed',

  removeFavorite = '[Saved Homes] Remove Favorite',
  removeFavoriteSuccess = '[Saved Homes] Remove Favorite Success',
  removeFavoriteFailed = '[Saved Homes] Remove Favorite Failed',
}

export class GetListings implements Action {
  readonly type = SavedHomesActionTypes.getListings;
}

export class GetListingsSuccess implements Action {
  readonly type = SavedHomesActionTypes.getListingsSuccess;

  constructor(public payload: IListingCard[]) {
  }
}

export class GetListingsFailed implements Action {
  readonly type = SavedHomesActionTypes.getListingsFailed;
}

export class AddFavorite implements Action {
  readonly type = SavedHomesActionTypes.addFavorite;

  constructor(public payload: string) {
  }
}

export class AddFavoriteSuccess implements Action {
  readonly type = SavedHomesActionTypes.addFavoriteSuccess;

  constructor(public payload: string) {
  }
}

export class AddFavoriteFailed implements Action {
  readonly type = SavedHomesActionTypes.addFavoriteFailed;
}

export class RemoveFavorite implements Action {
  readonly type = SavedHomesActionTypes.removeFavorite;

  constructor(public payload: string) {
  }
}

export class RemoveFavoriteSuccess implements Action {
  readonly type = SavedHomesActionTypes.removeFavoriteSuccess;

  constructor(public payload: string) {
  }
}

export class RemoveFavoriteFailed implements Action {
  readonly type = SavedHomesActionTypes.removeFavoriteFailed;
}

export type SavedHomesActions =
  | GetListings
  | GetListingsSuccess
  | GetListingsFailed
  | AddFavorite
  | AddFavoriteSuccess
  | AddFavoriteFailed
  | RemoveFavorite
  | RemoveFavoriteSuccess
  | RemoveFavoriteFailed
  ;
