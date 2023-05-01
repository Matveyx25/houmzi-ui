import React, { useContext } from 'react';
import s from './agents-popup.module.scss';
import { IUser } from '../../../interfaces/buy/user.interface';
import c from 'classnames';
import { Button } from '../../shared/button/button';
import { LayoutContext } from '../../../contexts/layout.context';

interface IProps {
  user: IUser
}

export const AgentsPopup: React.FC<IProps> = ({ user }) => {
  const { windowWidth } = useContext(LayoutContext);

  const renderRate = () => user?.rate
    ? <span className={s.user__rate}>
        <i className="icon-star2"/>
        <span className={s.user__text}>{user?.rate}/5&nbsp;</span>
        <span className={c(s.user__text, s.card__text_orange)}>({user?.reviewsCount})</span>
      </span>
    : null;

  return (
    <>
      <div className={s.agents}>
        <div className={s.user}>
          {
            user?.avatar
              ? <img src={user?.avatar} alt="" className={s.user__avatar}/>
              : <div className={s.user__avatar}>
                <i className="icon-profile"/>
              </div>
          }
          <div className={s.user__info}>
            <span className={s.user__name}>{user?.name}</span>
            {windowWidth < 768 && renderRate()}
            {
              user?.phone &&
              <span className={s.user__text}>{user?.phone}</span>
            }
            {
              user?.email &&
              <span className={s.user__text}>{user?.email}</span>
            }
          </div>
          <div className={s.wrap}>
            {windowWidth >= 768 && renderRate()}
            <Button color="blue" className={s.user__btn}>Contact</Button>
          </div>
        </div>
      </div>
      <p className={s.text}>
        By pressing Contact, you agree our Terms and conditions and Privacy politics
      </p>
    </>
  );
};
