import { IRootState } from '../reducers';
import { createSelector } from 'reselect';
import { IListingCard } from '../../interfaces/my-listings/listing-card.interface';

const _myListings = (state: IRootState) => state.myListings;
const _createdListingId = (state: IRootState) => _myListings(state).createdListingId;
const _myActiveListings = (state: IRootState) => _myListings(state).active;
const _myDraftListings = (state: IRootState) => _myListings(state).draft;

export const myActiveListings = createSelector(
  _myActiveListings,
  (listingCards: IListingCard[]) => listingCards,
);

export const myDraftListings = createSelector(
  _myDraftListings,
  (listingCards: IListingCard[]) => listingCards,
);

export const createdListingId = createSelector(
  _createdListingId,
  (createdListingId: string) => createdListingId,
);
