import React from 'react';
import c from 'classnames/bind';
import s from './tab-control.module.scss';

interface IProps {
  name: string;
  isActive: boolean;

  onClick(): void;
}

export class TabControl extends React.Component<IProps> {

  render(): React.ReactElement {
    const { name, isActive, onClick } = this.props;

    return (
      <div className={c(s.tab, isActive && s.active)} onClick={onClick}>
        {name}
      </div>
    );
  }

}
