import React from 'react';
import s from './block.module.scss';

interface IProps {
  title: string
}

class Block extends React.Component<IProps> {
  render(): React.ReactElement {
    const { title, children } = this.props;

    return (
      <div className={s.block}>
        <h2 className={s.block__title}>
          {title}
        </h2>
        <div className={s.block__list}>
          {children}
        </div>
      </div>
    );
  }
}

export default Block;
