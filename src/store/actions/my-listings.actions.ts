import { Action } from 'redux';
import { IListingCard } from '../../interfaces/my-listings/listing-card.interface';
import { ICreateListingData } from '../../interfaces/my-listings/create-listing-data.interface';

export enum MyListingsActionTypes {
  getMyActiveListings = '[My Listings] Get My Active Listings',
  getMyActiveListingsSuccess = '[My Listings] Get My Active Listings Success',
  getMyActiveListingsFailed = '[My Listings] Get My Active Listings Failed',

  getMyDraftListings = '[My Listings] Get My Draft Listings',
  getMyDraftListingsSuccess = '[My Listings] Get My Draft Listings Success',
  getMyDraftListingsFailed = '[My Listings] Get My Draft Listings Failed',

  createListing = '[My Listings] Create Listing',
  createListingSuccess = '[My Listings] Create Listing Success',
  createListingFailed = '[My Listings] Create Listing Failed',

  deleteListing = '[My Listings] Delete Listing',
  deleteListingSuccess = '[My Listings] Delete Listing Success',
  deleteListingFailed = '[My Listings] Delete Listing Failed',
}

export class GetMyActiveListings implements Action {
  readonly type = MyListingsActionTypes.getMyActiveListings;
}

export class GetMyActiveListingsSuccess implements Action {
  readonly type = MyListingsActionTypes.getMyActiveListingsSuccess;

  constructor(public payload: IListingCard[]) {
  }
}

export class GetMyActiveListingsFailed implements Action {
  readonly type = MyListingsActionTypes.getMyActiveListingsFailed;
}

export class GetMyDraftListings implements Action {
  readonly type = MyListingsActionTypes.getMyDraftListings;
}

export class GetMyDraftListingsSuccess implements Action {
  readonly type = MyListingsActionTypes.getMyDraftListingsSuccess;

  constructor(public payload: IListingCard[]) {
  }
}

export class GetMyDraftListingsFailed implements Action {
  readonly type = MyListingsActionTypes.getMyDraftListingsFailed;
}

export class CreateListing implements Action {
  readonly type = MyListingsActionTypes.createListing;

  constructor(public payload: ICreateListingData) {
  }
}

export class CreateListingSuccess implements Action {
  readonly type = MyListingsActionTypes.createListingSuccess;

  constructor(public payload: string) {
  }
}

export class CreateListingFailed implements Action {
  readonly type = MyListingsActionTypes.createListingFailed;
}

export class DeleteListing implements Action {
  readonly type = MyListingsActionTypes.deleteListing;

  constructor(public payload: string) {
  }
}

export class DeleteListingSuccess implements Action {
  readonly type = MyListingsActionTypes.deleteListingSuccess;

  constructor(public payload: string) {
  }
}

export class DeleteListingFailed implements Action {
  readonly type = MyListingsActionTypes.deleteListingFailed;
}

export type MyListingsActions =
  | GetMyActiveListings
  | GetMyActiveListingsSuccess
  | GetMyActiveListingsFailed
  | GetMyDraftListings
  | GetMyDraftListingsSuccess
  | GetMyDraftListingsFailed
  | CreateListing
  | CreateListingSuccess
  | CreateListingFailed
  | DeleteListing
  | DeleteListingSuccess
  | DeleteListingFailed
  ;
