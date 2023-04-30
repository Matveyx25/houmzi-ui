import React from 'react';
import s from './share-button.module.scss';
import c from 'classnames/bind';
import { Popup } from '../popup/popup';
import { EmailPopup } from './email-popup/email-popup';
import { UsersPopup } from './users-popup/users-popup';
import { sendLinkToEmail } from '../../../services/share.service';
import { toast } from 'react-toastify';

interface IProps {
  classNames?: string
  btnClass?: string
  position?: 'left' | 'right'
  link: string
}

interface IState {
  isOpenedDropdown: boolean
  openedPopup: 'users' | 'email'
  sharedRef: React.RefObject<HTMLDivElement>
}

export class ShareButton extends React.Component<IProps, IState> {
  buttonsWithLabel = [
    {
      icon: 'icon-message',
      label: 'Chat',
      action: () => this.switchPopup('users'),
    },
    {
      icon: 'icon-link',
      label: 'Copy',
      action: () => this.copyLink(),
    },
    {
      icon: 'icon-email',
      label: 'Email',
      action: () => this.switchPopup('email'),
    },
  ];
  socialButtons = [
    {
      icon: 'icon-whatsapp',
      link: 'https://api.whatsapp.com/send?text=' + encodeURIComponent(this.props.link),
    },
    {
      icon: 'icon-facebook',
      link: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(this.props.link),
    },
    {
      icon: 'icon-twitter',
      link: 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(this.props.link),
    },
  ];

  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpenedDropdown: false,
      openedPopup: null,
      sharedRef: React.createRef(),
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  renderButtonWithLabel = () => this.buttonsWithLabel.map(({ icon, label, action }) => (
    <div key={icon} className={s.btnWrap}>
      <button className={s.btn} onClick={action}>
        <i className={icon}/>
      </button>
      <span className={s.label}>{label}</span>
    </div>
  ));

  switchDropdown = () => {
    this.setState({ isOpenedDropdown: !this.state.isOpenedDropdown });
  };

  switchPopup = (name?: 'users' | 'email') => {
    this.setState({ openedPopup: name });
  };

  handleClickOutside = (e: any) => {
    const { sharedRef } = this.state;

    if (sharedRef.current && !sharedRef.current.contains(e.target)) {
      this.setState({ isOpenedDropdown: false });
    }
  };

  sendLinkToEmail = (email: string) => {
    const { link } = this.props;

    sendLinkToEmail(email, link).then(() =>
      toast.success('Link has been send to email!'));
    this.setState({ isOpenedDropdown: false, openedPopup: null });
  };

  copyLink = () => {
    const { link } = this.props;

    navigator.clipboard.writeText(link).then(() =>
      toast.info('Link has been copied!'),
    );
  };

  sendLinkToChats = () => {
    console.log('send link to chats');
  };

  render() {
    const { classNames, btnClass, position } = this.props;
    const { isOpenedDropdown, openedPopup, sharedRef } = this.state;

    return (
      <div ref={sharedRef} className={c(s.wrap, classNames)}>
        <button className={c(s.share, btnClass)} onClick={this.switchDropdown}>
          <i className="icon-share"/>
        </button>
        {
          isOpenedDropdown &&
          <div className={c(s.dropdown, position === 'left' && s.left)}>
            <p className={s.title}>Share by</p>
            <div className={s.block}>
              {this.renderButtonWithLabel()}
            </div>
            <div className={s.block}>
              {
                this.socialButtons.map(({ icon, link }) => (
                  <a key={icon} href={link} target="_blank" className={s.btn}>
                    <i className={icon}/>
                  </a>
                ))
              }
            </div>
          </div>
        }

        <Popup visible={openedPopup === 'email'} title="Send to mail" onClose={this.switchPopup}>
          <EmailPopup sendForm={this.sendLinkToEmail}/>
        </Popup>
        <Popup visible={openedPopup === 'users'} title="Send to chat" width={60} onClose={this.switchPopup}>
          <UsersPopup sendLinkToChats={this.sendLinkToChats}/>
        </Popup>
      </div>
    );
  }
}
