import React from 'react';
import s from './reviews.module.scss';
import { IReview } from '../../../interfaces/shared/review.interface';
import Review from '../../shared/review/review';
import { EmptyReviewsList } from '../../shared/empty-reviews-list/empty-reviews-list';

interface IProps {
  reviews: IReview[]
  total: number

  getReviews(): void
}

interface IState {
  listRef: React.RefObject<HTMLDivElement>
}

export class Reviews extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { listRef: React.createRef() };
  }

  componentDidMount() {
    this.state.listRef.current.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.state.listRef.current.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { total, reviews, getReviews } = this.props;
    const { scrollHeight: sH, clientHeight: cH, scrollTop: sT } = this.state.listRef.current;

    if (sH - cH === sT && total > reviews.length)
      getReviews();
  };

  render() {
    const { reviews } = this.props;
    const { listRef } = this.state;

    return (
      <div className={s.reviews}>
        <div className={s.reviews__header}>
          Reviews
        </div>
        <div className={s.reviews__container}>
          <div ref={listRef} className={s.reviews__list}>
            {
              reviews?.length
                ? reviews?.map((review: IReview) => (
                  <Review key={review.id} review={review}/>
                ))
                : <EmptyReviewsList/>
            }
          </div>
        </div>
      </div>
    );
  }
}
