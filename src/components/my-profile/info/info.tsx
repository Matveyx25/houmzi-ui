import React from 'react';
import c from 'classnames';
import s from './info.module.scss';
import { WithTranslation, withTranslation } from 'react-i18next';
import { IProfileInfo } from '../../../interfaces/shared/profile-info.interface';
import { ProfileInfo } from '../../shared/profile-info/profile-info';
import { Button } from '../../shared/button/button';

interface IProps extends WithTranslation {
  profile: IProfileInfo
  countReviews: number

  onOpenPopup(name: string): void
}

export const Info: React.FC<IProps> = ({ profile, countReviews, onOpenPopup, t }) => (
  <div className={s.info}>
    <ProfileInfo profile={profile} countReviews={countReviews}/>
    <div className={s.info__buttons}>
      <Button
        color="blue"
        className={c(s.info__button, s.info__button_edit)}
        onClick={() => onOpenPopup('edit')}
      >
        {t('edit')}
      </Button>
      <Button color="blueBorder" className={s.info__button}>
        {t('agent')}
      </Button>
    </div>
  </div>
);

export default withTranslation('profile')(Info);
