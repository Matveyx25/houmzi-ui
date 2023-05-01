import React from 'react';
import c from 'classnames';
import s from './block.module.scss';

interface IProps {
  title?: string

  onClick?(): void
}

interface IState {
  isOpen: boolean
  content: React.RefObject<HTMLDivElement>
}

export class Block extends React.Component<IProps, IState> {
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
    const { title, children, onClick } = this.props;
    const { isOpen, content } = this.state;
    const contentStyle = { maxHeight: isOpen || !title ? content.current?.scrollHeight : 0 };

    return (
      <div className={c(s.block, isOpen && s.open)} onClick={onClick && onClick}>
        {
          title &&
          <span className={s.block__title} onClick={this.onSwitch}>
            {title}
            <i className={c('icon-arrow', s.block__icon)}/>
          </span>
        }
        <div
          ref={content}
          className={c(
            s.block__content,
            title && s.block__content_accordion,
          )}
          style={contentStyle}
        >
          {children}
        </div>
      </div>
    );
  }
}
