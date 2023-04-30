import React from 'react';
import { IRootState } from '../../store/reducers';
import { createdListingId } from '../../store/selectors/my-listings.selectors';
import { listingConfig } from '../../store/selectors/lisitng.selectors';
import { compose, Dispatch } from 'redux';
import { CreateListing, MyListingsActions } from '../../store/actions/my-listings.actions';
import { GetConfig, ListingActions } from '../../store/actions/listing.actions';
import { ICreateListingData } from '../../interfaces/my-listings/create-listing-data.interface';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { WithRouterProps } from 'next/dist/client/with-router';
import { IListingConfig } from '../../interfaces/edit-listing/listing-config.interface';
import CreateListingComponent from '../../components/my-listings/create-listing/create-listing';
import { Popup } from '../../components/shared/popup/popup';
import { AddListing } from '../../components/my-listings/add-listing/add-listing';

interface IProps extends WithRouterProps {
  createdListingId: string
  listingConfig: IListingConfig

  createListing(data: ICreateListingData): void

  getConfig(): void
}

interface IState {
  isOpenedPopup: boolean
}

class CreateListingContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { isOpenedPopup: false };
  }

  componentDidMount(): void {
    const { listingConfig, getConfig } = this.props;

    if (!listingConfig) {
      getConfig();
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { router, createdListingId } = this.props;

    if (createdListingId !== prevProps.createdListingId) {
      router.push(`/edit-listing/${createdListingId}`);
    }
  }

  switchPopup = () => {
    const { isOpenedPopup } = this.state;

    this.setState({ isOpenedPopup: !isOpenedPopup });
  };

  render(): React.ReactElement {
    const { listingConfig, createListing } = this.props;
    const { isOpenedPopup } = this.state;

    return (
      <>
        <CreateListingComponent openPopup={this.switchPopup}/>

        <Popup title="Add property" visible={isOpenedPopup} onClose={this.switchPopup}>
          <AddListing listingConfig={listingConfig} createListing={createListing}/>
        </Popup>
      </>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  createdListingId: createdListingId(state),
  listingConfig: listingConfig(state),
});

const mapDispatchToProps = (dispatch: Dispatch<MyListingsActions | ListingActions>) => ({
  createListing: (data: ICreateListingData) => dispatch(new CreateListing(data)),
  getConfig: () => dispatch(new GetConfig()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(CreateListingContainer);
