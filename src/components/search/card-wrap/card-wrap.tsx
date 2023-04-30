import React from 'react';
import s from './card-wrap.module.scss';

class CardWrap extends React.Component {
  render(): React.ReactElement {
    const { children } = this.props;

    return (
      <div className={s.wrap}>
        {children}
      </div>
    );
  }
}

export default CardWrap;
