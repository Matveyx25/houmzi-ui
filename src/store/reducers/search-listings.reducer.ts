import { IListingCard } from '../../interfaces/buy/listing-card.interface';
import { SearchListingsActions, SearchListingsActionTypes } from '../actions/search-listings.actions';
import { IListing } from '../../interfaces/buy/listing.interface';
import { switchIsFavorite } from '../../helpers/switch-is-faivorite';

export interface IState {
  listingCards: IListingCard[]
  count: number
  selectedListing: IListing
}

export function reducer(state: IState = null, actions: SearchListingsActions) {
  switch (actions.type) {
    case SearchListingsActionTypes.getListingsSuccess:
      return {
        ...state,
        listingCards: actions.payload.items,
        count: actions.payload.total,
      };
    case SearchListingsActionTypes.addFavoriteSuccess:
      return {
        ...state,
        listingCards: switchIsFavorite(state.listingCards, actions.payload),
      };
    case SearchListingsActionTypes.removeFavoriteSuccess:
      return {
        ...state,
        listingCards: switchIsFavorite(state.listingCards, actions.payload),
      };
    case SearchListingsActionTypes.getListing:
      return {
        ...state,
        selectedListing: null,
      };
    case SearchListingsActionTypes.getListingSuccess:
      return {
        ...state,
        selectedListing: actions.payload,
      };
    default:
      return state;
  }
}
