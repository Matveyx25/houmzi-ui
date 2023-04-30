import { IListingCard } from '../../interfaces/my-listings/listing-card.interface';
import { MyListingsActions, MyListingsActionTypes } from '../actions/my-listings.actions';

export interface IState {
  active: IListingCard[]
  draft: IListingCard[]
  createdListingId: string
}

const initialState: IState = {
  active: [],
  draft: [],
  createdListingId: '',
};

export function reducer(state: IState = initialState, actions: MyListingsActions): IState {
  switch (actions.type) {
    case MyListingsActionTypes.createListingSuccess:
      return {
        ...state,
        createdListingId: actions.payload,
      };
    case MyListingsActionTypes.getMyActiveListingsSuccess:
      return {
        ...state,
        active: actions.payload,
      };
    case MyListingsActionTypes.getMyDraftListingsSuccess:
      return {
        ...state,
        draft: actions.payload,
      };
    case MyListingsActionTypes.deleteListingSuccess:
      return {
        ...state,
        active: state.active.filter((listing: IListingCard) => listing.id !== actions.payload),
        draft: state.draft.filter((listing: IListingCard) => listing.id !== actions.payload),
      };
    default:
      return state;
  }
}
