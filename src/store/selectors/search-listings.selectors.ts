import { IRootState } from '../reducers';
import { createSelector } from 'reselect';
import { IListingCard } from '../../interfaces/buy/listing-card.interface';
import { IListing } from '../../interfaces/buy/listing.interface';

const _searchListings = (state: IRootState) => state.searchListings;
const _listingCards = (state: IRootState) => _searchListings(state)?.listingCards;
const _count = (state: IRootState) => _searchListings(state)?.count;
const _selectedListing = (state: IRootState) => _searchListings(state)?.selectedListing;

export const listings = createSelector(
  _listingCards,
  (listings: IListingCard[]) => listings,
);

export const count = createSelector(
  _count,
  (count: number) => count,
);

export const selectedListing = createSelector(
  _selectedListing,
  (listing: IListing) => listing,
);
