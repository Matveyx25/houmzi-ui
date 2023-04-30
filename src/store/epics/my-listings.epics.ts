import { Observable } from 'rxjs';
import {
  CreateListing,
  CreateListingFailed,
  CreateListingSuccess, DeleteListing, DeleteListingFailed, DeleteListingSuccess,
  GetMyActiveListings,
  GetMyActiveListingsFailed,
  GetMyActiveListingsSuccess,
  GetMyDraftListings, GetMyDraftListingsFailed,
  GetMyDraftListingsSuccess,
  MyListingsActionTypes,
} from '../actions/my-listings.actions';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, pluck } from 'rxjs/operators';
import { ICreateListingData } from '../../interfaces/my-listings/create-listing-data.interface';
import { createListing, deleteListing, getMyListings } from '../../services/my-listings.service';
import { IListingCard } from '../../interfaces/my-listings/listing-card.interface';

export const createListingEpic = (action$: Observable<CreateListing>) => action$.pipe(
  ofType<CreateListing>(MyListingsActionTypes.createListing),
  pluck('payload'),
  mergeMap((createListingData: ICreateListingData) =>
    createListing(createListingData)
      .then((listingId: string) => new CreateListingSuccess(listingId))
      .catch(() => new CreateListingFailed()),
  ),
);

export const getMyActiveListingsEpic = (action$: Observable<GetMyActiveListings>) => action$.pipe(
  ofType<GetMyActiveListings>(MyListingsActionTypes.getMyActiveListings),
  mergeMap(() =>
    getMyListings(false)
      .then((listingCards: IListingCard[]) => new GetMyActiveListingsSuccess(listingCards))
      .catch(() => new GetMyActiveListingsFailed()),
  ),
);

export const getMyDraftListingsEpic = (action$: Observable<GetMyDraftListings>) => action$.pipe(
  ofType<GetMyDraftListings>(MyListingsActionTypes.getMyDraftListings),
  mergeMap(() =>
    getMyListings(true)
      .then((listingCards: IListingCard[]) => new GetMyDraftListingsSuccess(listingCards))
      .catch(() => new GetMyDraftListingsFailed()),
  ),
);

export const deleteListingEpic = (action$: Observable<DeleteListing>) => action$.pipe(
  ofType<DeleteListing>(MyListingsActionTypes.deleteListing),
  pluck('payload'),
  mergeMap((id: string) =>
    deleteListing(id)
      .then(() => new DeleteListingSuccess(id))
      .catch(() => new DeleteListingFailed()),
  ),
);

export const myListingsEpics = combineEpics(
  createListingEpic,
  getMyActiveListingsEpic,
  getMyDraftListingsEpic,
  deleteListingEpic,
);
