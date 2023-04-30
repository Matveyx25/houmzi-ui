import React from 'react';
import HomesContainer from '../../src/containers/homes/homes-container';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../../src/store/store';
import { Store } from 'redux';
import { GetConfigFailed, GetConfigSuccess } from '../../src/store/actions/listing.actions';
import { getConfig } from '../../src/services/edit-listing.service';
import { IListingConfig } from '../../src/interfaces/edit-listing/listing-config.interface';

const Index: React.FC = () => <HomesContainer/>;

export default Index;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (ctx: GetServerSidePropsContext & { store: Store }) => {
    const { dispatch } = ctx.store;

    await getConfig(ctx)
      .then((config: IListingConfig) => dispatch(new GetConfigSuccess(config)))
      .catch(() => dispatch(new GetConfigFailed()));
  });
