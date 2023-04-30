import React from 'react';
import DashboardContainer from '../../../src/containers/dashboard/dashboard-container';
import s from './settings.module.scss';
import { Block } from '../../../src/components/settings/block/block';
import ChangePasswordContainer from '../../../src/containers/settings/change-password-container';
import TwoFactorContainer from '../../../src/containers/settings/two-factor-container';
import { AccountInfo } from '../../../src/components/settings/account-info/account-info';
import { LogoutContainer } from '../../../src/containers/settings/logout-container';
import SocialsContainer from '../../../src/containers/settings/socials-container';
import { Layout } from '../../../src/containers/layout/layout-container';

class Index extends React.Component {
  render(): React.ReactElement {
    return (
      <Layout title="Settings">
        <DashboardContainer>
          <div className={s.settings}>
            <Block className={s.block}>
              <ChangePasswordContainer/>
              <div className={s.settings__divider}/>
              <TwoFactorContainer/>
            </Block>
            <AccountInfo/>
            <LogoutContainer/>
            <SocialsContainer/>
          </div>
        </DashboardContainer>
      </Layout>
    );
  }
}

export default Index;
