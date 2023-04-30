import { IRootState } from '../reducers';
import { createSelector } from 'reselect';
import { IListingCard } from '../../interfaces/buy/listing-card.interface';

const _country = (state: IRootState) => state.country;

export const listings = createSelector(
  _country,
  (listings: IListingCard[]) => listings,
);
