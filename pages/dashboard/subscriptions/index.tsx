import React from 'react';
import s from './subscriptions.module.scss';
import DashboardContainer from '../../../src/containers/dashboard/dashboard-container';
import { IRootState } from '../../../src/store/reducers';
import { newsletters } from '../../../src/store/selectors/newsletters.selectors';
import { Dispatch, Store } from 'redux';
import { GetNewslettersFailed, GetNewslettersSuccess } from '../../../src/store/actions/newsletter.actions';
import {
  ProfileActions,
  SetNewsletter,
  UnsubscribeNewsletters,
} from '../../../src/store/actions/profile.actions';
import { INewsletterData } from '../../../src/interfaces/my-profile/newsletter-data.interface';
import { connect } from 'react-redux';
import { INewsletter } from '../../../src/interfaces/newsletters/newsletter.interface';
import { Switch } from '../../../src/components/shared/switch/switch';
import { Layout } from '../../../src/containers/layout/layout-container';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../../../src/store/store';
import { getNewsletters } from '../../../src/services/newslwtters.service';

interface IProps {
  newsletters: INewsletter[]

  setNewsletter(newsletterData: INewsletterData): void

  unsubscribeNewsletters(): void
}

const Newsletters: React.FC<IProps> = ({ newsletters, setNewsletter, unsubscribeNewsletters }) => {
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const newsletter: INewsletter = newsletters.find((n: INewsletter) => n.id === name);

    setNewsletter({ id: newsletter.id, enabled: !newsletter.isEnable });
  };

  return (
    <Layout title="Subscriptions">
      <DashboardContainer>
        <div className={s.newsletters__wrap}>
          <div className={s.newsletters}>
            <h2 className={s.newsletters__title}>
              Subscriptions
            </h2>
            <div className={s.newsletters__list}>
              {
                newsletters.map((newsletter: INewsletter) => (
                  <div key={newsletter.id} className={s.newsletters__item}>
                    {newsletter?.title}
                    <Switch name={newsletter?.id} checked={newsletter?.isEnable} onChange={onChange}/>
                  </div>
                ))
              }
              <div className={s.newsletters__unsubscribe} onClick={unsubscribeNewsletters}>
                Unsubscribe from all newsletters
              </div>
            </div>
            <img src="/images/bike.svg" alt="" className={s.newsletters__img}/>
          </div>
        </div>
      </DashboardContainer>
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({ newsletters: newsletters(state) });

const mapDispatchToProps = (dispatch: Dispatch<ProfileActions>) => ({
  setNewsletter: (newsletterData: INewsletterData) => dispatch(new SetNewsletter(newsletterData)),
  unsubscribeNewsletters: () => dispatch(new UnsubscribeNewsletters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Newsletters);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (cxt: GetServerSidePropsContext & { store: Store }) => {
    const { dispatch } = cxt.store;

    await getNewsletters(cxt)
      .then((newsletters: INewsletter[]) => dispatch(new GetNewslettersSuccess(newsletters)))
      .catch(() => dispatch(new GetNewslettersFailed()));
  });
