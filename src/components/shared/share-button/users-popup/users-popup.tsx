import React from 'react';
import s from './users-popup.module.scss';
import c from 'classnames';
import { Input } from '../../input/input';
import { Button } from '../../button/button';
import { UserCard } from '../user-card/user-card';

interface IProps {
  sendLinkToChats(): void
}

interface IState {
  search: string
  selectedUsers: string[]
  scrollRef: React.RefObject<HTMLDivElement>
  isShowShadow: boolean
}

const usersList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export class UsersPopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      search: '',
      selectedUsers: [],
      scrollRef: React.createRef(),
      isShowShadow: true,
    };
  }

  componentDidMount() {
    this.state.scrollRef.current.addEventListener('scroll', this.checkScroll);
    this.checkScroll();
  }

  componentWillUnmount() {
    this.state.scrollRef.current.removeEventListener('scroll', this.checkScroll);
  }

  checkScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = this.state.scrollRef.current;

    this.setState({
      isShowShadow: scrollHeight - clientHeight === scrollTop,
    });
  };

  onChange = (search) => this.setState({ search });

  selectUser = (id: string) => {
    const { selectedUsers } = this.state;
    const findUserId = selectedUsers.find((userId: string) => userId === id);

    if (findUserId) {
      this.setState({ selectedUsers: selectedUsers.filter((userId) => userId !== id) });
    } else {
      this.setState({ selectedUsers: [...selectedUsers, id] });
    }
  };

  render() {
    const { search, selectedUsers, scrollRef, isShowShadow } = this.state;

    return (
      <div className={s.container}>
        <Input
          value={search}
          placeholder="Search"
          prevIcon="icon-search"
          className={s.input}
          isHideError
          onChange={this.onChange}
        />
        <div className={c(s.list, isShowShadow && s.hide_shadow)}>
          <div ref={scrollRef} className={s.scroll}>
            {
              usersList.map((id: string) => (
                <UserCard
                  key={id}
                  id={id}
                  isChecked={!!selectedUsers.find((userId: string) => userId === id)}
                  selectUser={this.selectUser}
                />
              ))
            }
          </div>
        </div>
        <Button color="blue" className={s.btn}>
          Send
        </Button>
      </div>
    );
  }
}
