import React from 'react';
import s from './listing.module.scss';
import { WithRouterProps } from 'next/dist/client/with-router';
import { IListingConfig } from '../../src/interfaces/edit-listing/listing-config.interface';
import { IRootState } from '../../src/store/reducers';
import { listingConfig, listingData } from '../../src/store/selectors/lisitng.selectors';
import { Dispatch, Store } from 'redux';
import {
  AddMedia, DeleteMedia,
  GetConfigFailed, GetConfigSuccess,
  GetListingFailed, GetListingSuccess,
  ListingActions,
  UpdateListing,
} from '../../src/store/actions/listing.actions';
import { connect } from 'react-redux';
import { Address } from '../../src/components/edit-listing/address/address';
import { Details } from '../../src/components/edit-listing/details/details';
import { Price } from '../../src/components/edit-listing/price/price';
import { Contacts } from '../../src/components/edit-listing/contacts/contacts';
import { OtherDetails } from '../../src/components/edit-listing/other-details/other-details';
import { Amenities } from '../../src/components/edit-listing/amenities/amenities';
import { Photos } from '../../src/components/edit-listing/photos/photos';
import Rental from '../../src/components/edit-listing/rental/rental';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Layout } from '../../src/containers/layout/layout-container';
import { wrapper } from '../../src/store/store';
import { getConfig, getListing } from '../../src/services/edit-listing.service';

interface IProps extends WithRouterProps {
  listingId: string
  listingConfig: IListingConfig
  listingData: any

  updateListing(id: string, data: any): void

  addMedia(id: string, file: FormData): void

  deleteMedia(id: string, fileId: string): void
}

class EditListing extends React.Component<IProps> {
  updateData = (data: any) => {
    const { listingId, updateListing } = this.props;

    updateListing(listingId, data);
  };

  addMedia = (file: FormData) => {
    const { listingId, addMedia } = this.props;

    addMedia(listingId, file);
  };

  deleteMedia = (fileId: string) => {
    const { listingId, listingData, updateListing, deleteMedia } = this.props;

    if (listingData?.avatarId === fileId) {
      updateListing(listingId, { avatar: '' });
    }

    deleteMedia(listingId, fileId);
  };

  render(): React.ReactElement {
    const { listingConfig, listingData } = this.props;

    return (
      <Layout title="Edit Listing">
        <section className={s.listing}>
          <Address
            address={listingData?.address}
            hideAddress={listingData?.hideAddress}
            lat={listingData?.lat}
            lng={listingData?.lng}
            updateData={this.updateData}
          />
          <div className={s.listing__content}>
            <Details listingConfig={listingConfig} listingData={listingData} updateData={this.updateData}/>
            <Price listingData={listingData} updateData={this.updateData}/>
            <Contacts listingConfig={listingConfig} listingData={listingData} updateData={this.updateData}/>
            <OtherDetails listingConfig={listingConfig} listingData={listingData} updateData={this.updateData}/>
            <Amenities listingConfig={listingConfig} listingData={listingData} updateData={this.updateData}/>
            <Photos
              listingData={listingData}
              addMedia={this.addMedia}
              deleteMedia={this.deleteMedia}
              updateData={this.updateData}
            />
            <Rental listingData={listingData} updateData={this.updateData}/>
          </div>
        </section>
      </Layout>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  listingConfig: listingConfig(state),
  listingData: listingData(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ListingActions>) => ({
  updateListing: (id: string, data: any) => dispatch(new UpdateListing({ id, data })),
  addMedia: (id: string, file: FormData) => dispatch(new AddMedia({ id, file })),
  deleteMedia: (id: string, fileId: string) => dispatch(new DeleteMedia({ id, fileId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditListing);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (ctx: GetServerSidePropsContext<{ id: string }> & { store: Store }) => {
    const { id: listingId } = ctx.params;
    const { dispatch } = ctx.store;

    await getConfig(ctx)
      .then((config: IListingConfig) => dispatch(new GetConfigSuccess(config)))
      .catch(() => dispatch(new GetConfigFailed()));
    await getListing(ctx, listingId)
      .then((listing) => dispatch(new GetListingSuccess(listing)))
      .catch(() => dispatch(new GetListingFailed()));

    return { props: { listingId } };
  });
