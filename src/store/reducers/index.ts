import { combineReducers } from 'redux';
import * as agents from './agents.reducer';
import * as country from './country.reducer';
import * as lang from './lang.reducer';
import * as profile from './profile.reducer';
import * as newsletters from './newsletter.reducer';
import * as myListings from './my-listings.reducer';
import * as listing from './listing.reducer';
import * as searchListings from './search-listings.reducer';
import * as savedSearches from './saved-searches.reducer';
import * as savedHomes from './saved-homes.reducer';
import * as  user from './user.reducers';
import { INewsletter } from '../../interfaces/newsletters/newsletter.interface';
import { ISavedSearch } from '../../interfaces/saved-searches/saved-search.interface';
import { IListingCard } from '../../interfaces/buy/listing-card.interface';

export interface IRootState {
  agents: agents.IState
  country: IListingCard[]
  lang: string
  profile: profile.IState
  newsletters: INewsletter[]
  user: user.IState
  myListings: myListings.IState
  listing: listing.IState
  searchListings: searchListings.IState
  savedSearches: ISavedSearch[]
  savedHomes: IListingCard[]
}

export const combinedReducer = combineReducers({
  agents: agents.reducer,
  country: country.reducer,
  lang: lang.reducer,
  profile: profile.reducer,
  newsletters: newsletters.reducer,
  user: user.reducer,
  myListings: myListings.reducer,
  listing: listing.reducer,
  searchListings: searchListings.reducer,
  savedSearches: savedSearches.reducer,
  savedHomes: savedHomes.reducer,
});
