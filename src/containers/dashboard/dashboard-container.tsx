import React from 'react';
import s from './dashboard.module.scss';
import Menu from '../../components/dashboard/menu/menu';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { LayoutContext } from '../../contexts/layout.context';
import { getAccessToken } from '../../helpers/cookies.helpers';
import { removeBodyStyles, switchBodyStyles } from '../../helpers/body-styles';

class DashboardContainer extends React.Component<WithRouterProps> {
  static contextType = LayoutContext;

  componentDidMount() {
    switchBodyStyles(this.context.windowWidth, 768);
  }

  componentDidUpdate() {
    switchBodyStyles(this.context.windowWidth, 768);
  }

  componentWillUnmount() {
    removeBodyStyles();
  }

  render(): React.ReactElement {
    return true
    // getAccessToken()
      ? <section className={s.dashboard}>
        {this.context.windowWidth >= 768 && <Menu/>}
        <div className={s.dashboard__content}>
          {this.props.children}
        </div>
      </section>
      : null;
  }
}

export default withRouter(DashboardContainer);
