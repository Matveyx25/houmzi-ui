import React from 'react';
import { Layout } from '../../../src/containers/layout/layout-container';
import { Default } from '../../../src/components/analytics/default/default';
import { ILayoutContext, LayoutContext } from '../../../src/contexts/layout.context';
import DashboardContainer from '../../../src/containers/dashboard/dashboard-container';

const Analytics: React.FC = () => (
  <Layout title="Tariffs">
    <LayoutContext.Consumer>
      {
        ({ windowWidth }: ILayoutContext) => windowWidth < 768
          ? <Default/>
          : <DashboardContainer>
            <Default/>
          </DashboardContainer>
      }
    </LayoutContext.Consumer>
  </Layout>
);

export default Analytics;
