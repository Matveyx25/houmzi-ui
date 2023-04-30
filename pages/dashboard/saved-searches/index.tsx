import React from 'react';
import s from './saved-searches.module.scss';
import DashboardContainer from '../../../src/containers/dashboard/dashboard-container';
import { Store } from 'redux';
import { GetSavedSearchesFailed, GetSavedSearchesSuccess } from '../../../src/store/actions/saved-searches.actions';
import { savedSearches } from '../../../src/store/selectors/saved-seraches.selectors';
import { ISavedSearch } from '../../../src/interfaces/saved-searches/saved-search.interface';
import { IListingConfig } from '../../../src/interfaces/edit-listing/listing-config.interface';
import { GetConfigFailed, GetConfigSuccess } from '../../../src/store/actions/listing.actions';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../../../src/store/store';
import { Layout } from '../../../src/containers/layout/layout-container';
import { getSavedSearches } from '../../../src/services/saved-searches.service';
import { getConfig } from '../../../src/services/edit-listing.service';
import ListContainer from '../../../src/containers/saved-searches/list-container/list-container';
import { IRootState } from '../../../src/store/reducers';
import { connect } from 'react-redux';

interface IProps {
  savedSearches: ISavedSearch[]
}

const Index: React.FC<IProps> = ({savedSearches}) => (
  <Layout title="Saved Searches">
    <DashboardContainer>
      <div className={s.wrap}>
        <h2 className={s.title}>
          {savedSearches.length} saved search{savedSearches.length !== 1 && 'es'}
        </h2>
        <ListContainer/>
      </div>
    </DashboardContainer>
  </Layout>
);

const mapStateToProps = (state: IRootState) => ({
  savedSearches: savedSearches(state),
});

export default connect(mapStateToProps)(Index);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (ctx: GetServerSidePropsContext & { store: Store }) => {
    const { dispatch } = ctx.store;

    await getSavedSearches(ctx)
      .then((savedSearches: ISavedSearch[]) => dispatch(new GetSavedSearchesSuccess(savedSearches)))
      .catch(() => dispatch(new GetSavedSearchesFailed()));
    await getConfig(ctx)
      .then((config: IListingConfig) => dispatch(new GetConfigSuccess(config)))
      .catch(() => dispatch(new GetConfigFailed()));
  });
