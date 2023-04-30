import React from 'react';
import s from './profile.module.scss';
import DashboardContainer from '../../../src/containers/dashboard/dashboard-container';
import { withTranslation, WithTranslation } from 'react-i18next';
import InfoContainer from '../../../src/containers/my-profile/info-container';
import ReviewsContainer from '../../../src/containers/my-profile/reviews-container';
import { Layout } from '../../../src/containers/layout/layout-container';

const Profile: React.FC<WithTranslation> = ({ t }) => (
  <Layout title="My Profile">
    <DashboardContainer>
      <div className={s.profile}>
        <h2 className={s.profile__title}>
          {t('title')}
        </h2>
        <InfoContainer/>
        <ReviewsContainer/>
      </div>
    </DashboardContainer>
  </Layout>
);

export default withTranslation('profile')(Profile);
