import { Action } from 'redux';
import { IListingConfig } from '../../interfaces/edit-listing/listing-config.interface';
import { IMedia } from '../../interfaces/edit-listing/media.interface';

export enum ListingActionTypes {
  getConfig = '[Listing] Get Config',
  getConfigSuccess = '[Listing] Get Config Success',
  getConfigFailed = '[Listing] Get Config Failed',

  getListing = '[Listing] Get Listing',
  getListingSuccess = '[Listing] Get Listing Success',
  getListingFailed = '[Listing] Get Listing Failed',

  updateListing = '[Listing] Update Listing',
  updateListingSuccess = '[Listing] Update Listing Success',
  updateListingFailed = '[Listing] Update Listing Failed',

  addMedia = '[Listing] Add Media',
  addMediaSuccess = '[Listing] Add Media Success',
  addMediaFailed = '[Listing] Add Media Failed',

  deleteMedia = '[Listing] Delete Media',
  deleteMediaSuccess = '[Listing] Delete Media Success',
  deleteMediaFailed = '[Listing] Delete Media Failed',
}

export class GetConfig implements Action {
  readonly type = ListingActionTypes.getConfig;
}

export class GetConfigSuccess implements Action {
  readonly type = ListingActionTypes.getConfigSuccess;

  constructor(public payload: IListingConfig) {
  }
}

export class GetConfigFailed implements Action {
  readonly type = ListingActionTypes.getConfigFailed;
}

export class GetListing implements Action {
  readonly type = ListingActionTypes.getListing;

  constructor(public payload: string) {
  }
}

export class GetListingSuccess implements Action {
  readonly type = ListingActionTypes.getListingSuccess;

  constructor(public payload: any) {
  }
}

export class GetListingFailed implements Action {
  readonly type = ListingActionTypes.getListingFailed;
}

export class UpdateListing implements Action {
  readonly type = ListingActionTypes.updateListing;

  constructor(public payload: { id: string, data: any }) {
  }
}

export class UpdateListingSuccess implements Action {
  readonly type = ListingActionTypes.updateListingSuccess;

  constructor(public payload: any) {
  }
}

export class UpdateListingFailed implements Action {
  readonly type = ListingActionTypes.updateListingFailed;
}

export class AddMedia implements Action {
  readonly type = ListingActionTypes.addMedia;

  constructor(public payload: { id: string, file: FormData }) {
  }
}

export class AddMediaSuccess implements Action {
  readonly type = ListingActionTypes.addMediaSuccess;

  constructor(public payload: IMedia) {
  }
}

export class AddMediaFailed implements Action {
  readonly type = ListingActionTypes.addMediaFailed;
}

export class DeleteMedia implements Action {
  readonly type = ListingActionTypes.deleteMedia;

  constructor(public payload: { id: string, fileId: string }) {
  }
}

export class DeleteMediaSuccess implements Action {
  readonly type = ListingActionTypes.deleteMediaSuccess;

  constructor(public payload: string) {
  }
}

export class DeleteMediaFailed implements Action {
  readonly type = ListingActionTypes.deleteMediaFailed;
}

export type ListingActions =
  | GetConfig
  | GetConfigSuccess
  | GetConfigFailed
  | GetListing
  | GetListingSuccess
  | GetListingFailed
  | UpdateListing
  | UpdateListingSuccess
  | UpdateListingFailed
  | AddMedia
  | AddMediaSuccess
  | AddMediaFailed
  | DeleteMedia
  | DeleteMediaSuccess
  | DeleteMediaFailed
  ;
