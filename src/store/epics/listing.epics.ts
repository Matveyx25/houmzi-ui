import { Observable } from 'rxjs';
import {
  AddMedia, AddMediaFailed, AddMediaSuccess, DeleteMedia, DeleteMediaFailed, DeleteMediaSuccess,
  GetConfig, GetConfigFailed, GetConfigSuccess,
  GetListing,
  GetListingFailed,
  GetListingSuccess,
  ListingActionTypes, UpdateListing, UpdateListingFailed, UpdateListingSuccess,
} from '../actions/listing.actions';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, pluck } from 'rxjs/operators';
import { addMedia, deleteMedia, getConfig, getListing, updateListing } from '../../services/edit-listing.service';
import { IListingConfig } from '../../interfaces/edit-listing/listing-config.interface';
import { IMedia } from '../../interfaces/edit-listing/media.interface';

export const getConfigEpic = (action$: Observable<GetConfig>) => action$.pipe(
  ofType<GetConfig>(ListingActionTypes.getConfig),
  mergeMap(() =>
    getConfig(null)
      .then((config: IListingConfig) => new GetConfigSuccess(config))
      .catch(() => new GetConfigFailed()),
  ),
);

export const getListingEpic = (action$: Observable<GetListing>) => action$.pipe(
  ofType<GetListing>(ListingActionTypes.getListing),
  pluck('payload'),
  mergeMap((id: string) =>
    getListing(null, id)
      .then((listing: any) => new GetListingSuccess(listing))
      .catch(() => new GetListingFailed()),
  ),
);

export const updateListingEpic = (action$: Observable<UpdateListing>) => action$.pipe(
  ofType<UpdateListing>(ListingActionTypes.updateListing),
  pluck('payload'),
  mergeMap(({ id, data }: { id: string, data: any }) =>
    updateListing(id, data)
      .then(() => new UpdateListingSuccess(data))
      .catch(() => new UpdateListingFailed()),
  ),
);

export const addMediaEpic = (action$: Observable<AddMedia>) => action$.pipe(
  ofType<AddMedia>(ListingActionTypes.addMedia),
  pluck('payload'),
  mergeMap(({ id, file }: { id: string, file: FormData }) =>
    addMedia(id, file)
      .then((media: IMedia) => new AddMediaSuccess(media))
      .catch(() => new AddMediaFailed()),
  ),
);

export const deleteMediaEpic = (action$: Observable<DeleteMedia>) => action$.pipe(
  ofType<DeleteMedia>(ListingActionTypes.deleteMedia),
  pluck('payload'),
  mergeMap(({ id, fileId }: { id: string, fileId: string }) =>
    deleteMedia(id, fileId)
      .then(() => new DeleteMediaSuccess(fileId))
      .catch(() => new DeleteMediaFailed()),
  ),
);

export const listingEpics = combineEpics(
  getConfigEpic,
  getListingEpic,
  updateListingEpic,
  addMediaEpic,
  deleteMediaEpic,
);
