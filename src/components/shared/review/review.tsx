import React, { RefObject } from 'react';
import c from 'classnames';
import s from './review.module.scss';
import { WithTranslation, withTranslation } from 'react-i18next';
import { IReview } from '../../../interfaces/shared/review.interface';
import Link from 'next/link';

interface IProps extends WithTranslation {
  isMyReviews?: boolean
  review: IReview
}

interface IState {
  textRef: RefObject<HTMLSpanElement>
  isShow: boolean
  isViewButton: boolean
}

class Review extends React.Component<IProps, IState> {
  stars = [1, 2, 3, 4, 5];

  constructor(props: IProps) {
    super(props);

    this.state = {
      textRef: React.createRef<HTMLSpanElement>(),
      isShow: false,
      isViewButton: false,
    };
  }

  componentDidMount(): void {
    const { textRef } = this.state;

    this.setState({
      isViewButton: textRef.current!.offsetHeight > 60,
    });
  }

  parseDate = (date: string): string => {
    const dateNow: Date = new Date(),
      dateReview: Date = new Date(date),
      day: number = 1000 * 60 * 60 * 24,
      timeDiff: number = Math.abs(dateNow.getTime() - dateReview.getTime()),
      diffDays: number = Math.round(timeDiff / day);

    switch (true) {
      case diffDays === 0:
        return 'Today';
      case diffDays === 1:
        return 'Yesterday';
      case diffDays < 30:
        return `${diffDays} days ago`;
      case diffDays === 30:
        return '1 month ago';
      case diffDays < 365:
        return `${Math.round(diffDays / 30)} months ago`;
      case diffDays === 365:
        return '1 year ago';
      default:
        return `${Math.round(diffDays / 365)} years ago`;
    }
  };

  render(): React.ReactElement {
    const { isMyReviews, review, t } = this.props;
    const { textRef, isShow, isViewButton } = this.state;

    return (
      <div className={s.review}>
        <div className={s.review__wrap}>
          <Link href={`/profile/${review.authorId}`}>
            <a className={s.review__avatarWrap}>
              {
                review?.avatar
                  ? <img
                    src={review?.avatar}
                    alt=""
                    className={s.review__avatar}
                  />
                  : <div className={s.review__avatar}>
                    <i className="icon-profile"/>
                  </div>
              }
            </a>
          </Link>
          <div className={c(s.review__rate, s.review__rate_mobile)}>
            <i className={c('icon-star2', s.review__star)}/>
            <span>{review?.rate}</span>
          </div>
        </div>
        <div className={s.review__main}>
          <div className={s.review__header}>
            <div className={s.review__title}>
              {isMyReviews && t('about')} {review?.name}
            </div>
            <div className={c(s.review__rate, s.review__rate_desktop)}>
              {
                this.stars.map((star: number) => (
                  <i
                    key={star}
                    className={c(
                      'icon-star2',
                      s.review__star,
                      star <= review.rate && s.active,
                    )}/>
                ))
              }
            </div>
            <div className={s.review__date}>
              {this.parseDate(review?.date)}
            </div>
          </div>
          <div className={s.review__content}>
            <div className={c(s.review__text, isShow && s.review__text_full)}>
              <span ref={textRef}>
                {review?.text}
              </span>
            </div>
            {
              isViewButton && <div
                className={s.review__showMore}
                onClick={() => this.setState({ isShow: !isShow })}
              >
                {isShow ? 'Show less' : t('showMore')}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('profile')(Review);
