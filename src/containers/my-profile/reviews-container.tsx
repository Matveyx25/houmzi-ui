import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Reviews from '../../components/my-profile/reviews/reviews';
import { GetMyReviews, GetReviews, ReviewsActions } from '../../store/actions/reviews.actions';
import { myReviews, reviews } from '../../store/selectors/reviews.selectors';
import { IRootState } from '../../store/reducers';
import { IReview } from '../../interfaces/shared/review.interface';

interface IProps {
  reviews: IReview[]
  myReviews: IReview[]

  getReviews(): void

  getMyReviews(): void
}

class ReviewsContainer extends React.Component<IProps> {
  componentDidMount() {
    const { getReviews, getMyReviews } = this.props;

    getReviews();
    getMyReviews();
  }

  render(): React.ReactElement {
    return (
      <Reviews {...this.props}/>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  reviews: reviews(state),
  myReviews: myReviews(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ReviewsActions>) => ({
  getReviews: () => dispatch(new GetReviews()),
  getMyReviews: () => dispatch(new GetMyReviews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer);
