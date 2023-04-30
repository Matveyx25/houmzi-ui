import { urlToString } from '../../src/helpers/url-parser.helper';
import React from 'react';
import HomesContainer from '../../src/containers/homes/homes-container';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../../src/store/store';
import { Store } from 'redux';
import { GetConfigFailed, GetConfigSuccess } from '../../src/store/actions/listing.actions';
import { getConfig } from '../../src/services/edit-listing.service';
import { IListingConfig } from '../../src/interfaces/edit-listing/listing-config.interface';

interface IProps {
  location: string
  zoom: number
}

const Location: React.FC<IProps> = (props) => <HomesContainer {...props}/>;

export default Location;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (ctx: GetServerSidePropsContext<{ location: string }> & { store: Store }) => {
    const { dispatch } = ctx.store;

    await getConfig(ctx)
      .then((config: IListingConfig) => dispatch(new GetConfigSuccess(config)))
      .catch(() => dispatch(new GetConfigFailed()));

    return {
      props: {
        location: urlToString(ctx.params.location),
        zoom: 11,
      },
    };
  });
