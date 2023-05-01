import React from 'react';
import c from 'classnames';
import s from './dialog.module.scss';

interface IProps {
  width?: number | string
  height?: number | string
  title?: string
  animationType: 'leave' | 'enter'

  onClose?(): void
}

export class Dialog extends React.Component<IProps> {
  static defaultProps: IProps = {
    width: 52,
    animationType: 'leave',
  };

  render(): React.ReactElement {
    const { width, height, title, animationType, onClose, children } = this.props;
    const popupStyles = {
      width: typeof width === 'string' ? width : width + 'rem',
      height: typeof height === 'string' ? height : height + 'rem',
    };

    return (
      <div
        className={c(
          s.dialog,
          s[`fade_${animationType}`],
        )}
        style={popupStyles}
      >
        <i
          className={c('icon-close', s.dialog__close)}
          onClick={onClose}
        />
        {
          title && <div className={s.dialog__header}>
            {title}
          </div>
        }
        <div
          className={s.dialog__scroll}>
          <div className={s.dialog__content}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
