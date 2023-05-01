import React from 'react';
import s from './socials.module.scss';
import sSettings from '../../../../pages/dashboard/settings/settings.module.scss';
import c from 'classnames';
import { Block } from '../block/block';

interface IProps {
  onOpenPopup(): void
}

const socials: string[] = ['Facebook', 'Google', 'Apple'];

export const Socials: React.FC<IProps> = ({ onOpenPopup }) => (
  <Block className={s.socials}>
    <span className={sSettings.title}>
      Social networks
    </span>
    <div className={s.socials__list}>
      {
        socials.map((social: string) => (
          <div key={social} className={s.socials__item}>
            <span className={sSettings.text}>
              {social}
            </span>
            <span className={c(sSettings.btn, sSettings.btn_blue)}>Connect</span>
          </div>
        ))
      }
    </div>
    <span className={c(sSettings.btn, sSettings.btn_red)} onClick={onOpenPopup}>
      Delete account
    </span>
  </Block>
);
