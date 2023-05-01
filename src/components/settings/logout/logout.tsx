import React from 'react';
import s from './logout.module.scss';
import sSettings from '../../../../pages/dashboard/settings/settings.module.scss';
import c from 'classnames';
import { Block } from '../block/block';

interface IProps {
  onLogout(): void
}

const Logout: React.FC<IProps> = ({ onLogout }) => (
  <Block className={s.logout}>
    <span className={sSettings.text}>
      Active sessions
    </span>
    <span className={c(sSettings.btn, sSettings.btn_red)} onClick={onLogout}>
      Log out all devices
    </span>
  </Block>
);

export default Logout;
