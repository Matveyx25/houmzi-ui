import React from 'react';
import DashboardContainer from '../../src/containers/dashboard/dashboard-container';
import { List } from '../../src/components/tariffs/list/list';
import { tariffs } from '../../src/data/tariffs/tariffs.data';
import { Layout } from '../../src/containers/layout/layout-container';
import { Popup } from '../../src/components/shared/popup/popup';
import { DowngradePopup } from '../../src/components/tariffs/downgrade-popup';
import { UpgradePopup } from '../../src/components/tariffs/upgrade-popup';
import { SuccessfulPopup } from '../../src/components/tariffs/successful-popup';
import { NotFundsPopup } from '../../src/components/tariffs/not-funds-popup';

const Tariffs: React.FC = () => (
  <Layout title="Tariffs">
    <DashboardContainer>
      <List tariffs={tariffs} changeTariff={(id: number) => console.log(id)}/>
      <Popup title="Switch to another tariff" visible={false}>
        <DowngradePopup/>
      </Popup>
      <Popup title="Switch to another tariff" visible={false}>
        <UpgradePopup/>
      </Popup>
      <Popup title="Successful!" visible={false}>
        <SuccessfulPopup/>
      </Popup>
      <Popup title="You are short of funds" visible={false}>
        <SuccessfulPopup/>
      </Popup>
      <Popup title="You are short of funds" visible={false}>
        <NotFundsPopup/>
      </Popup>
    </DashboardContainer>
  </Layout>
);

export default Tariffs;
