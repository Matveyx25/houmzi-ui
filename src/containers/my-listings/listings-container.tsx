import React from 'react';
import { myActiveListings, myDraftListings } from '../../store/selectors/my-listings.selectors';
import { IRootState } from '../../store/reducers';
import { WithRouterProps } from 'next/dist/client/with-router';
import {
  DeleteListing,
  GetMyActiveListings, GetMyDraftListings,
  MyListingsActions,
} from '../../store/actions/my-listings.actions';
import { listingConfig } from '../../store/selectors/lisitng.selectors';
import { compose, Dispatch } from 'redux';
import { IListingCard } from '../../interfaces/my-listings/listing-card.interface';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { Listings } from '../../components/my-listings/listings/listings';
import { ListingActions, UpdateListing } from '../../store/actions/listing.actions';

interface IProps extends WithRouterProps {
  listings: IListingCard[]

  getActiveListings(): void

  getDraftListings(): void

  deleteListing(id: string): void

  publishListing(id: string): void
}

class ListingsContainer extends React.Component<IProps> {
  componentDidMount(): void {
    const { getActiveListings, getDraftListings, router } = this.props;

    router.pathname.includes('drafts') ? getDraftListings() : getActiveListings();
  }

  render(): React.ReactElement {
    const { listings, deleteListing, publishListing, router } = this.props;

    return (
      <Listings
        draft={router.pathname.includes('drafts')}
        listings={listings}
        deleteListing={deleteListing}
        publishListing={publishListing}
      />
    );
  }
}

const mapStateToProps = (state: IRootState, props: IProps) => ({
  listings: props.router?.pathname?.includes('drafts') ? myDraftListings(state) : myActiveListings(state),
  listingConfig: listingConfig(state),
});

const mapDispatchToProps = (dispatch: Dispatch<MyListingsActions | ListingActions>) => ({
  getActiveListings: () => dispatch(new GetMyActiveListings()),
  getDraftListings: () => dispatch(new GetMyDraftListings()),
  deleteListing: (id: string) => dispatch(new DeleteListing(id)),
  publishListing: (id: string) => dispatch(new UpdateListing({ id, data: { isDraft: false } })),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ListingsContainer);
