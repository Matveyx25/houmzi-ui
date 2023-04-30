import React from 'react';
import s from './my-listings.module.scss';
import DashboardContainer from '../../../src/containers/dashboard/dashboard-container';
import ListingsContainer from '../../../src/containers/my-listings/listings-container';
import { Tabs } from '../../../src/components/my-listings/tabs/tabs';
import { Layout } from '../../../src/containers/layout/layout-container';

const Index: React.FC = () => (
  <Layout title="My Active Listings">
    <DashboardContainer>
      <div className={s.listings}>
        <Tabs/>
        <ListingsContainer/>
      </div>
    </DashboardContainer>
  </Layout>
);

export default Index;
