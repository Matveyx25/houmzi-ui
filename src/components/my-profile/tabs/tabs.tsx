import React from 'react';
import c from 'classnames/bind';
import s from './tabs.module.scss';
import { TabControl } from '../tab-control/tab-control';
import { Tab } from '../tab/tab';

interface IProps {
  className?: string
}

interface IState {
  activeTab: number
}

export class Tabs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      activeTab: 0,
    };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(activeTab: number) {
    const { activeTab: currentTab } = this.state;

    if (currentTab !== activeTab) {
      this.setState({ activeTab });
    }
  }

  render(): React.ReactElement {
    const { className, children } = this.props;
    const { activeTab } = this.state;

    return (
      <div className={c(s.tabs, className)}>
        <div className={s.tabs__header}>
          {
            (children! as Tab[]).map((tab: Tab, index: number) => (
              <TabControl
                key={index}
                name={tab.props.name}
                isActive={index === activeTab}
                onClick={() => this.setActiveTab(index)}
              />
            ))
          }
        </div>
        <div className={s.tabs__container}>
          {
            React.Children
              .map(children, (child: React.ReactNode, index: number) =>
                React.cloneElement(child as React.ReactElement, { index, activeTab }),
              )
          }
        </div>
      </div>
    );
  }
}
