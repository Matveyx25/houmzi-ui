import React from 'react';
import c from 'classnames';
import s from './button.module.scss';

interface IProps {
  title: string
  color: 'blue' | 'grey' | 'red'

  onClick?(): void
}

interface IState {
  isOpen: boolean
  content: React.RefObject<HTMLDivElement>
}

export class Button extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    title: '',
    color: 'blue',
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: false,
      content: React.createRef<HTMLDivElement>(),
    };
  }

  onSwitch = () => {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  };

  render(): React.ReactElement {
    const { title, color, onClick, children } = this.props;
    const { isOpen, content } = this.state;
    const contentStyle = { maxHeight: isOpen ? content.current?.scrollHeight : 0 };

    return (
      <div
        className={c(
          s.button,
          s[`button_${color}`],
          isOpen && content.current?.scrollHeight && s.open,
        )}
      >
        <span
          className={c(s.button__title, isOpen && s.open)}
          onClick={children ? this.onSwitch : onClick}
        >
          {title}
          {children && <i className={c('icon-arrow', s.button__icon)}/>}
        </span>
        {
          children &&
          <div ref={content} className={s.button__content} style={contentStyle}>
            {children}
          </div>
        }
      </div>
    );
  }
}
