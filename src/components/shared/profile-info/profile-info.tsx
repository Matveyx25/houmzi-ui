import React from 'react';
import c from 'classnames';
import s from './profile-info.module.scss';
import { IProfileInfo } from '../../../interfaces/shared/profile-info.interface';

interface IProps {
  profile: IProfileInfo
  countReviews: number
}

export const ProfileInfo: React.FC<IProps> = ({ profile, countReviews }) => (
  <div className={s.info__wrap}>
    {
      profile?.avatar
        ? <img src={profile?.avatar} alt="" className={s.info__avatar}/>
        : <div className={s.info__avatar}>
          <i className="icon-profile"/>
        </div>
    }
    <div className={s.info__data}>
      <div className={s.info__name}>
        {profile?.name}
      </div>
      <div className={c(s.info__rate, !profile?.rate && s.info__rate_no)}>
        <i className="icon-star2"/>
        {
          profile?.rate
            ? <>
              {profile?.rate}/5
              <span className={s.info__countReviews}>
                ({countReviews})
              </span>
            </>
            : <>No Reviews</>
        }

      </div>
      <div className={s.info__item}>
        <i className="icon-mail"/>
        <span>{profile?.email}</span>
      </div>
      <div className={c(s.info__item, !profile?.phone && s.info__item_grey)}>
        <i className="icon-call"/>
        <span>{profile?.phone ? profile?.phone : 'No phone'}</span>
      </div>
    </div>
  </div>
);
