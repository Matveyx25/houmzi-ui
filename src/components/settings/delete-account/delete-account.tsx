import React from 'react';
import s from './delete-account.module.scss';
import { Button } from '../../shared/button/button';

interface IProps {
  deleteAccount(): void
}

const DeleteAccount: React.FC<IProps> = ({ deleteAccount }) => (
  <div className={s.deleteAccount}>
    <div className={s.deleteAccount__desc}>
      You cannot restore deleted account
    </div>
    <Button color="orange" className={s.deleteAccount__btn} onClick={deleteAccount}>
      Delete
    </Button>
  </div>
);

export default DeleteAccount;
