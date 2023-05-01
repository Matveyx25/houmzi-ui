import React from 'react';
import c from 'classnames';
import s from './popup.module.scss';
import { Dialog } from './components/dialog';

interface IProps {
  width?: number | string
  height?: number | string
  title?: string
  visible: boolean

  onClose?(): void
}

interface IState {
  animationType: 'leave' | 'enter'
  isShow: boolean
}

export class Popup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { animationType: 'leave', isShow: false };
  }

  componentDidMount(): void {
    if (this.props.visible) {
      this.enter();
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (this.props.visible && !prevProps.visible) {
      this.enter();
    }

    if (!this.props.visible && prevProps.visible) {
      this.leave();
    }
  }

  enter = () => this.setState({ isShow: true, animationType: 'enter' });

  leave = () => this.setState({ animationType: 'leave' });

  animationEnd = () => {
    const { animationType } = this.state;

    if (animationType === 'leave') {
      this.setState({ isShow: false });
    }
  };

  render(): React.ReactElement | null {
    const { onClose } = this.props;
    const { animationType, isShow } = this.state;

    return isShow
      ? <div
        className={c(s.popup, s[`fade_${animationType}`])}
        onAnimationEnd={this.animationEnd}
      >
        <div className={s.popup__mask} onClick={onClose}/>
        <Dialog {...this.props} animationType={animationType}/>
      </div>
      : null;
  }
}
