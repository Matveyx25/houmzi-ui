import { ListingActions, ListingActionTypes } from '../actions/listing.actions';
import { IListingConfig } from '../../interfaces/edit-listing/listing-config.interface';
import { IMedia } from '../../interfaces/edit-listing/media.interface';

export interface IState {
  config: IListingConfig
  data: any
}

const initialState: IState = {
  config: null,
  data: null,
};

export function reducer(state: IState = initialState, actions: ListingActions): IState {
  switch (actions.type) {
    case ListingActionTypes.getConfigSuccess:
      return {
        ...state,
        config: actions.payload,
      };
    case ListingActionTypes.getListingSuccess:
      return {
        ...state,
        data: actions.payload,
      };
    case ListingActionTypes.updateListingSuccess:
      if (Object.keys(actions.payload)[0] === 'avatar') {
        return {
          ...state,
          data: { ...state.data, avatarId: actions.payload['avatar'] },
        };
      }
      return {
        ...state,
        data: { ...state.data, ...actions.payload },
      };
    case ListingActionTypes.addMediaSuccess:
      return {
        ...state,
        data: { ...state.data, media: [...state.data.media, actions.payload] },
      };
    case ListingActionTypes.deleteMediaSuccess:
      return {
        ...state,
        data: {
          ...state.data, media: state.data.media
            .filter((media: IMedia) => media.id !== actions.payload),
        },
      };
    default:
      return state;
  }
}
