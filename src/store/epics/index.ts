import { combineEpics } from 'redux-observable';
import { myProfileEpics } from './my-profile.epics';
import { countryEpics } from './country.epics';
import { getAgentsEpic } from './agents.epics';
import { userEpics } from './user.epics';
import { savedSearchesEpics } from './saved-searches.epics';
import { listingEpics } from './listing.epics';
import { savedHomesEpics } from './saved-homes.epics';
import { searchListingsEpics } from './search-listings.epics';
import { myListingsEpics } from './my-listings.epics';

export const rootEpics = combineEpics(
  countryEpics,
  myProfileEpics,
  myListingsEpics,
  listingEpics,
  searchListingsEpics,
  savedSearchesEpics,
  savedHomesEpics,
  getAgentsEpic,
  userEpics,
);
