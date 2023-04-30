import { IListingCard } from '../../interfaces/buy/listing-card.interface';
import { SavedHomesActions, SavedHomesActionTypes } from '../actions/saved-homes.actions';
import { switchIsFavorite } from '../../helpers/switch-is-faivorite';

export function reducer(state: IListingCard[] = [], actions: SavedHomesActions) {
  switch (actions.type) {
    case SavedHomesActionTypes.getListingsSuccess:
      return actions.payload;
    case SavedHomesActionTypes.addFavoriteSuccess:
      return switchIsFavorite(state, actions.payload);
    case SavedHomesActionTypes.removeFavoriteSuccess:
      return switchIsFavorite(state, actions.payload);
    default:
      return state;
  }
}
