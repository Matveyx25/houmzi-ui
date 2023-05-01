import React from 'react';
import s from './media-popup.module.scss';
import c from 'classnames';
import { IMedia } from '../../../interfaces/edit-listing/media.interface';
import { LayoutContext } from '../../../contexts/layout.context';

interface IProps {
  media: IMedia[]
  visible: boolean

  closePopup(): void
}

interface IState {
  animationType: 'leave' | 'enter'
  isShow: boolean
  currentSlide: number
  list: React.RefObject<HTMLDivElement>
}

export class MediaPopup extends React.Component<IProps, IState> {
  static contextType = LayoutContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      animationType: 'leave',
      isShow: false,
      currentSlide: 1,
      list: React.createRef<HTMLDivElement>(),
    };
  }

  componentDidMount() {
    if (this.props.visible) this.enter();

    document.addEventListener('keydown', this.pressKeys);
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    if (this.props.visible && !prevProps.visible) this.enter();
    if (!this.props.visible && prevProps.visible) this.leave();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.pressKeys);
  }

  pressKeys = (e: KeyboardEvent) => {
    e.code === 'ArrowLeft' && this.changeSlide('left');
    e.code === 'ArrowRight' && this.changeSlide('right');
  };

  enter = () => {
    this.setState({ isShow: true, animationType: 'enter' });
  };

  leave = () => {
    this.setState({ animationType: 'leave' });
  };

  animationEnd = () => {
    const { animationType } = this.state;

    if (animationType === 'leave') {
      this.setState({ isShow: false });
    }
  };

  changeSlide = (side: 'left' | 'right') => {
    const { media } = this.props;
    const { currentSlide, list } = this.state;
    let cSlide: number = 0;

    if (side === 'left') {
      if (currentSlide > 1) {
        cSlide = currentSlide - 1;
      }
    } else {
      if (currentSlide < media?.length) {
        cSlide = currentSlide + 1;
      }
    }

    if (cSlide) {
      this.setState({ currentSlide: cSlide });
      list.current!.style.transform = `translateX(${-100 * (cSlide - 1)}%)`;
    }
  };

  prevArrow = (): React.ReactElement => {
    const { currentSlide } = this.state;

    return <i
      className={c(
        s.popup__arrow,
        s.popup__arrow_prev,
        currentSlide === 1 && s.disabled,
        'icon-arrow')}
      onClick={() => this.changeSlide('left')}
    />;
  };

  nextArrow = (): React.ReactElement => {
    const { media } = this.props;
    const { currentSlide } = this.state;

    return <i
      className={c(
        s.popup__arrow,
        s.popup__arrow_next,
        currentSlide === media?.length && s.disabled,
        'icon-arrow')}
      onClick={() => this.changeSlide('right')}
    />;
  };

  render(): React.ReactElement | null {
    const { media, closePopup } = this.props;
    const { currentSlide, list, animationType, isShow } = this.state;
    const { windowWidth } = this.context;

    return isShow
      ? <div className={c(s.popup, s[`fade_${animationType}`])} onAnimationEnd={this.animationEnd}>
        <div className={s.popup__header}>
          {currentSlide}/{media?.length}
          <i className={c(s.popup__close, 'icon-close')} onClick={closePopup}/>
        </div>
        <div className={s.popup__content}>
          {
            windowWidth >= 768 &&
            <>
              {this.prevArrow()}
              <div className={c(s.clickableArea, s.clickableArea_left)} onClick={() => this.changeSlide('left')}/>
            </>
          }
          <div className={s.popup__scroll}>
            <div className={s.popup__list} ref={list}>
              {
                media?.map((media: IMedia) => (
                  <div key={media.id} className={s.popup__slide}>
                    {
                      media.type === 'image' &&
                      <img className={s.popup__media} src={media.url} alt=""/>
                    }
                  </div>
                ))
              }
            </div>
          </div>
          {
            windowWidth >= 768 &&
            <>
              {this.nextArrow()}
              <div className={c(s.clickableArea, s.clickableArea_right)} onClick={() => this.changeSlide('right')}/>
            </>
          }
        </div>
        {
          windowWidth < 768 &&
          <div className={s.popup__footer}>
            {this.prevArrow()}
            <div className={s.popup__indicators}>
              {
                media?.map((media: IMedia, index: number) => (
                  <div
                    key={media.id}
                    className={c(s.popup__indicator, index === currentSlide - 1 && s.active)}
                  />
                ))
              }
            </div>
            {this.nextArrow()}
          </div>
        }
      </div>
      : null;
  }
}
