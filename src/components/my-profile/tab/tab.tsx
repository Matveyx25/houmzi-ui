import React from 'react';
import c from 'classnames';
import s from './tab.module.scss';

interface IProps {
  name: string;
  activeTab?: number;
  index?: number;
}

export class Tab extends React.Component<IProps> {
  render(): React.ReactElement {
    const { activeTab, index, children } = this.props;

    return (
      <div className={c(s.tab, index === activeTab && s.active )}>
        {children}
      </div>
    );
  }

}
