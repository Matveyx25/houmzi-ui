import { IRootState } from '../reducers';
import { createSelector } from 'reselect';

export const _listing = (state: IRootState) => state.listing;
export const _listingConfig = (state: IRootState) => _listing(state).config;
export const _listingData = (state: IRootState) => _listing(state).data;

export const listingConfig = createSelector(
  _listingConfig,
  (config: any) => config,
);

export const listingData = createSelector(
  _listingData,
  (data: any) => data,
);
