import { IListingCard } from '../../interfaces/buy/listing-card.interface';
import { CountryActions, CountryActionTypes } from '../actions/country.actions';
import { switchIsFavorite } from '../../helpers/switch-is-faivorite';

export function reducer(state: IListingCard[] = [], actions: CountryActions): IListingCard[] {
  switch (actions.type) {
    case CountryActionTypes.getListingsSuccess:
      return actions.payload;
    case CountryActionTypes.addFavoriteSuccess:
      return switchIsFavorite(state, actions.payload);
    case CountryActionTypes.removeFavoriteSuccess:
      return switchIsFavorite(state, actions.payload);
    default:
      return state;
  }
}
