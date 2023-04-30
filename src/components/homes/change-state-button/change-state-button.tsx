import React from 'react';
import s from './change-state-button.module.scss';
import { Button } from '../../shared/button/button';

interface IProps {
  isActiveMap: boolean

  changeActiveScene(): void
}

export const ChangeStateButton: React.FC<IProps> = ({ isActiveMap, changeActiveScene }) => (
  <Button color="blue" className={s.btn} onClick={changeActiveScene}>
    <i className={isActiveMap ? 'icon-list' : 'icon-map'}/>
  </Button>
);
