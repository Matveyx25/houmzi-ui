import React from 'react';
import s from './info.module.scss';
import { Button } from '../../shared/button/button';
import { IProfile } from '../../../interfaces/user/profile.interface';
import { ProfileInfo } from '../../shared/profile-info/profile-info';

interface IProps {
  profile: IProfile
  total: number

  onOpenPopup(name: string): void
}

export const Info: React.FC<IProps> = ({ profile, total, onOpenPopup }) => (
  <div className={s.info}>
    <ProfileInfo profile={profile} countReviews={total}/>
    <div className={s.info__buttons}>
      <Button color="blue" className={s.info__button} onClick={() => onOpenPopup('send-message')}>
        Send message
      </Button>
      <Button color="blueBorder" className={s.info__button} onClick={() => onOpenPopup('add-review')}>
        Add review
      </Button>
    </div>
  </div>
);
