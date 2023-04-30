import React from 'react';
import { Listing } from '../../components/homes/listing/listing';
import { IRootState } from '../../store/reducers';
import { selectedListing } from '../../store/selectors/search-listings.selectors';
import { compose, Dispatch } from 'redux';
import {
  AddFavorite, GetListing,
  RemoveFavorite,
  SearchListingsActions,
} from '../../store/actions/search-listings.actions';
import { IListing } from '../../interfaces/buy/listing.interface';
import { MediaPopup } from '../../components/homes/media-popup/media-popup';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { Popup } from '../../components/shared/popup/popup';
import { OfferPopup } from '../../components/homes/offer-popup/offer-popup';
import { AgentsPopup } from '../../components/homes/agents-popup/agents-popup';

interface IProps extends WithRouterProps {
  listing: IListing

  getListing(id: string): void

  addFavorite(id: string): void

  removeFavorite(id: string): void
}

interface IState {
  openedPopup: 'media' | 'agents' | 'counter-offer'
}

class ListingContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { openedPopup: null };
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    if (this.props !== prevProps) {
      const { listing, router, getListing } = this.props;
      const { query } = router;

      if (!listing) {
        if (query.listingAddress && query.listingId) {
          getListing(query.listingId as string);
        }
      }
    }
  }

  switchPopup = (name?: 'media' | 'agents' | 'counter-offer') => {
    this.setState({ openedPopup: name || null });
  };

  removeSelectedListing = () => {
    const { router } = this.props;
    const listingId = router.query.listingId;
    const lastCountry = JSON.parse(localStorage.getItem('lastCountry'));
    let link = '/homes';

    if (listingId === lastCountry?.id) {
      link = `/homes/${lastCountry.country}`;
    }

    router.push(link, undefined, { shallow: true });
  };

  render(): React.ReactElement {
    const { listing, router, addFavorite, removeFavorite } = this.props;
    const { openedPopup } = this.state;

    return (
      <>
        <Listing
          listing={listing}
          visible={!!router.query.listingAddress}
          closePopup={this.removeSelectedListing}
          openPopup={this.switchPopup}
          addFavorite={() => addFavorite(router.query.listingId as string)}
          removeFavorite={() => removeFavorite(router.query.listingId as string)}
        />
        <MediaPopup media={listing?.media} visible={openedPopup === 'media'} closePopup={this.switchPopup}/>
        <Popup width={51} title="Agents" visible={openedPopup === 'agents'} onClose={this.switchPopup}>
          <AgentsPopup user={listing?.user}/>
        </Popup>
        <Popup width={63} visible={openedPopup === 'counter-offer'} title="Counter offer" onClose={this.switchPopup}>
          <OfferPopup user={listing?.user}/>
        </Popup>
      </>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  listing: selectedListing(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchListingsActions>) => ({
  addFavorite: (id: string) => dispatch(new AddFavorite(id)),
  removeFavorite: (id: string) => dispatch(new RemoveFavorite(id)),
  getListing: (id: string) => dispatch(new GetListing(id)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(ListingContainer);

