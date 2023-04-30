import { Action } from 'redux';
import { IListingCard } from '../../interfaces/buy/listing-card.interface';

export enum CountryActionTypes {
  getListings = '[Country] Get Listings',
  getListingsSuccess = '[Country] Get Listings Success',
  getListingsFailed = '[Country] Get Listings Failed',

  addFavorite = '[Country] Add Favorite',
  addFavoriteSuccess = '[Country] Add Favorite Success',
  addFavoriteFailed = '[Country] Add Favorite Failed',

  removeFavorite = '[Country] Remove Favorite',
  removeFavoriteSuccess = '[Country] Remove Favorite Success',
  removeFavoriteFailed = '[Country] Remove Favorite Failed',
}

export class GetListings implements Action {
  readonly type = CountryActionTypes.getListings;
}

export class GetListingsSuccess implements Action {
  readonly type = CountryActionTypes.getListingsSuccess;

  constructor(public payload: IListingCard[]) {
  }
}

export class GetListingsFailed implements Action {
  readonly type = CountryActionTypes.getListingsFailed;
}

export class AddFavorite implements Action {
  readonly type = CountryActionTypes.addFavorite;

  constructor(public payload: string) {
  }
}

export class AddFavoriteSuccess implements Action {
  readonly type = CountryActionTypes.addFavoriteSuccess;

  constructor(public payload: string) {
  }
}

export class AddFavoriteFailed implements Action {
  readonly type = CountryActionTypes.addFavoriteFailed;
}

export class RemoveFavorite implements Action {
  readonly type = CountryActionTypes.removeFavorite;

  constructor(public payload: string) {
  }
}

export class RemoveFavoriteSuccess implements Action {
  readonly type = CountryActionTypes.removeFavoriteSuccess;

  constructor(public payload: string) {
  }
}

export class RemoveFavoriteFailed implements Action {
  readonly type = CountryActionTypes.removeFavoriteFailed;
}

export type CountryActions =
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
