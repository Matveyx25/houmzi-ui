import React from 'react';
import s from './account-info.module.scss';
import sSettings from '../../../../pages/dashboard/settings/settings.module.scss';
import c from 'classnames/bind';
import { Block } from '../block/block';

export const AccountInfo: React.FC = () => (
  <Block className={s.info}>
    <span className={sSettings.title}>
      Account information
    </span>
    <div className={s.wrap}>
      <span className={sSettings.desc}>
        You can get a download of all the information on your page in pdf format.
      </span>
      <span className={c(sSettings.btn, sSettings.btn_blue)}>
        Download
      </span>
    </div>
  </Block>
);
