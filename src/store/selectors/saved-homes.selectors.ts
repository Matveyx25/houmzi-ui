import { IRootState } from '../reducers';
import { createSelector } from 'reselect';
import { IListingCard } from '../../interfaces/buy/listing-card.interface';

const _savedHomes = (state: IRootState) => state.savedHomes;

export const listings = createSelector(
  _savedHomes,
  (listings: IListingCard[]) => listings,
);
