import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IRootState } from '../../src/store/reducers';
import { Store } from 'redux';
import { GetProfileSuccess, GetReviewsSuccess } from '../../src/store/actions/user.actions';
import { userName } from '../../src/store/selectors/user.selectors';
import { connect } from 'react-redux';
import { IProfile } from '../../src/interfaces/user/profile.interface';
import { wrapper } from '../../src/store/store';
import { getProfile, getReviews } from '../../src/services/user.service';
import { Layout } from '../../src/containers/layout/layout-container';
import { ILayoutContext, LayoutContext } from '../../src/contexts/layout.context';
import UserContainer from '../../src/containers/user/user-container';
import { IReviewResponse } from '../../src/interfaces/shared/review-response.interface';

interface IProps {
  userName: string
}

const User: React.FC<IProps> = ({ userName }) => (
  <Layout title={userName || ''}>
    <LayoutContext.Consumer>
      {(context: ILayoutContext) => <UserContainer windowWidth={context.windowWidth}/>}
    </LayoutContext.Consumer>
  </Layout>
);

const mapStateToProps = (state: IRootState) => ({
  userName: userName(state),
});

export default connect(mapStateToProps)(User);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (cxt: GetServerSidePropsContext<{ id: string }> & { store: Store }) => {
    const { id } = cxt.params;
    const { dispatch } = cxt.store;

    return await getProfile(id)
      .then((profile: IProfile) => {
        dispatch(new GetProfileSuccess(profile));
      })
      .then(() => getReviews(id).then((reviews: IReviewResponse) => {
        dispatch(new GetReviewsSuccess(reviews));
      }))
      .catch(() => ({ redirect: { permanent: false, destination: '/404' } }));
  });
