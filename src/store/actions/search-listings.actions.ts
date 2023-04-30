import { Action } from 'redux';
import { IListingCard } from '../../interfaces/buy/listing-card.interface';
import { ISearchParams } from '../../interfaces/buy/search-params.interface';
import { IListing } from '../../interfaces/buy/listing.interface';

export enum SearchListingsActionTypes {
  getListings = '[Search On Map] Get Listings',
  getListingsSuccess = '[Search On Map] Get Listings Success',
  getListingsFailed = '[Search On Map] Get Listings Failed',

  addFavorite = '[Search On Map] Add Favorite',
  addFavoriteSuccess = '[Search On Map] Add Favorite Success',
  addFavoriteFailed = '[Search On Map] Add Favorite Failed',

  removeFavorite = '[Search On Map] Remove Favorite',
  removeFavoriteSuccess = '[Search On Map] Remove Favorite Success',
  removeFavoriteFailed = '[Search On Map] Remove Favorite Failed',

  getListing = '[Search On Map] Get Listing',
  getListingSuccess = '[Search On Map] Get Listing Success',
  getListingFailed = '[Search On Map] Get Listing Failed',
}

export class GetListings implements Action {
  readonly type = SearchListingsActionTypes.getListings;

  constructor(public payload: ISearchParams) {
  }
}

export class GetListingsSuccess implements Action {
  readonly type = SearchListingsActionTypes.getListingsSuccess;

  constructor(public payload: { items: IListingCard[]; total: number }) {
  }
}

export class GetListingsFailed implements Action {
  readonly type = SearchListingsActionTypes.getListingsFailed;
}

export class AddFavorite implements Action {
  readonly type = SearchListingsActionTypes.addFavorite;

  constructor(public payload: string) {
  }
}

export class AddFavoriteSuccess implements Action {
  readonly type = SearchListingsActionTypes.addFavoriteSuccess;

  constructor(public payload: string) {
  }
}

export class AddFavoriteFailed implements Action {
  readonly type = SearchListingsActionTypes.addFavoriteFailed;
}

export class RemoveFavorite implements Action {
  readonly type = SearchListingsActionTypes.removeFavorite;

  constructor(public payload: string) {
  }
}

export class RemoveFavoriteSuccess implements Action {
  readonly type = SearchListingsActionTypes.removeFavoriteSuccess;

  constructor(public payload: string) {
  }
}

export class RemoveFavoriteFailed implements Action {
  readonly type = SearchListingsActionTypes.removeFavoriteFailed;
}

export class GetListing implements Action {
  readonly type = SearchListingsActionTypes.getListing;

  constructor(public payload: string) {
  }
}

export class GetListingSuccess implements Action {
  readonly type = SearchListingsActionTypes.getListingSuccess;

  constructor(public payload: IListing) {
  }
}

export class GetListingFailed implements Action {
  readonly type = SearchListingsActionTypes.getListingFailed;
}

export type SearchListingsActions =
  | GetListings
  | GetListingsSuccess
  | GetListingsFailed
  | AddFavorite
  | AddFavoriteSuccess
  | AddFavoriteFailed
  | RemoveFavorite
  | RemoveFavoriteSuccess
  | RemoveFavoriteFailed
  | GetListing
  | GetListingSuccess
  | GetListingFailed
  ;
