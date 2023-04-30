import React from 'react';
import { Header } from '../src/components/agents/header/header';
import { Cards } from '../src/components/agents/cards/cards';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../src/store/store';
import { Dispatch, Store } from 'redux';
import { getAgents } from '../src/services/agents.service';
import { IAgentsResponse } from '../src/interfaces/agents-response.interface';
import { GetAgents, GetAgentsSuccess } from '../src/store/actions/agents.actions';
import { IRootState } from '../src/store/reducers';
import { agents } from '../src/store/selectors/agents.selectors';
import { IAgent } from '../src/interfaces/agent.interface';
import { connect } from 'react-redux';
import { Layout } from '../src/containers/layout/layout-container';

interface IProps {
  total: number
  items: IAgent[]
  currentPage: number

  getAgents(currentPage: number): void
}

class Agents extends React.Component<IProps> {
  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { total, items, currentPage, getAgents } = this.props;
    const { scrollHeight: sH, clientHeight: cH, scrollTop: sT } = document.documentElement;

    if (sH - cH === sT && total > items.length)
      getAgents(currentPage + 1);
  };

  render(): React.ReactElement {
    return (
      <Layout title="Agents">
        <Header/>
        <Cards {...this.props}/>
      </Layout>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({ ...agents(state) });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAgents: (currentPage: number) => dispatch(new GetAgents(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Agents);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (ctx: GetServerSidePropsContext & { store: Store }) => {
    await getAgents(ctx).then((res: IAgentsResponse) => ctx.store.dispatch(new GetAgentsSuccess(res)));
  });
