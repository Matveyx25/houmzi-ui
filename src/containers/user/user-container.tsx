import React from 'react';
import s from './user-container.module.scss';
import { Info } from '../../components/user/info/info';
import { Reviews } from '../../components/user/reviews/reviews';
import { Popup } from '../../components/shared/popup/popup';
import { AddReviewComponent } from '../../components/user/add-review/add-review';
import { IProfile } from '../../interfaces/user/profile.interface';
import { IReview } from '../../interfaces/shared/review.interface';
import { IAddReviewData } from '../../interfaces/user/add-review-data.interface';
import { connect } from 'react-redux';
import { IRootState } from '../../store/reducers';
import { user } from '../../store/selectors/user.selectors';
import { Dispatch } from 'redux';
import { AddReview, GetReviews, UserActions } from '../../store/actions/user.actions';
import { removeBodyStyles, switchBodyStyles } from '../../helpers/body-styles';

interface IProps {
  windowWidth: number
  profile: IProfile
  reviews: IReview[]
  total: number
  currentPage: number

  addReview(addReviewData: IAddReviewData): void

  getReviews(id: string, currentPage: number): void
}

interface IState {
  popupName: string
}

class UserContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { popupName: '' };
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { windowWidth } = this.props;

    if (windowWidth !== prevProps.windowWidth) {
      switchBodyStyles(windowWidth, 768)
    }
  }

  componentWillUnmount() {
    removeBodyStyles();
  }

  onOpenPopup = (popupName: string) => this.setState({ popupName });

  onClosePopup = () => this.setState({ popupName: '' });

  onAddReview = (rate: number, text: string) => {
    const { profile, addReview } = this.props;

    addReview({ rate, text, userId: profile.id });
    this.setState({ popupName: '' });
  };

  getReviews = () => {
    const { profile, currentPage, getReviews } = this.props;

    getReviews(profile.id, currentPage + 1);
  };

  render(): React.ReactElement {
    const { popupName } = this.state;

    return (
      <section className={s.user}>
        <h2 className={s.user__title}>Profile</h2>
        <Info {...this.props} onOpenPopup={this.onOpenPopup}/>
        <Reviews {...this.props} getReviews={this.getReviews}/>

        <Popup title="Add review" visible={popupName === 'add-review'} onClose={this.onClosePopup}>
          <AddReviewComponent onAddReview={this.onAddReview}/>
        </Popup>
      </section>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({ ...user(state) });

const mapDispatchToProps = (dispatch: Dispatch<UserActions>) => ({
  addReview: (addReviewData: IAddReviewData) => dispatch(new AddReview(addReviewData)),
  getReviews: (id: string, currentPage: number) => dispatch(new GetReviews({ id, currentPage })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
