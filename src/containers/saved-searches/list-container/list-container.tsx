import React from 'react';
import s from './list-container.module.scss';
import { Card } from '../../../components/saved-searches/card/card';
import { Dispatch } from 'redux';
import { ListingActions } from '../../../store/actions/listing.actions';
import {
  DeleteSavedSearch,
  RenameSavedSearch,
  SavedSearchesActions,
} from '../../../store/actions/saved-searches.actions';
import { connect } from 'react-redux';
import { IRootState } from '../../../store/reducers';
import { savedSearches } from '../../../store/selectors/saved-seraches.selectors';
import { listingConfig } from '../../../store/selectors/lisitng.selectors';
import { ISavedSearch } from '../../../interfaces/saved-searches/saved-search.interface';
import { IListingConfig } from '../../../interfaces/edit-listing/listing-config.interface';

interface IProps {
  savedSearches: ISavedSearch[]
  listingConfig: IListingConfig

  onRename(id: string, name: string): void

  onDelete(id: string): void
}

class ListContainer extends React.Component<IProps> {
  render(): React.ReactElement {
    const { savedSearches, ...props } = this.props;

    return (
      <div className={s.list}>
        {
          savedSearches?.map((savedSearch: ISavedSearch) => (
            <Card key={savedSearch.id} savedSearch={savedSearch} {...props}/>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  savedSearches: savedSearches(state),
  listingConfig: listingConfig(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ListingActions | SavedSearchesActions>) => ({
  onRename: (id: string, name: string) => dispatch(new RenameSavedSearch({ id, name })),
  onDelete: (id: string) => dispatch(new DeleteSavedSearch(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
