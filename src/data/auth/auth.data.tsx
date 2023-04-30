import { IAuthPopupsList } from '../../interfaces/auth/auth.interfaces';
import { ThankYou } from '../../components/auth/thank-you/thank-you';
import { RegisterSuccess } from '../../components/auth/register-success/register-success';
import { ChangePasswordSuccess } from '../../components/auth/change-password-success/change-password-success';

export const popups: IAuthPopupsList[] = [
  {
    title: 'Thank you for joining us!',
    flag: 'thank-you',
    Component: <ThankYou/>,
  },
  {
    title: 'You are almost with us!',
    flag: 'register-success',
    Component: <RegisterSuccess/>,
  },
  {
    title: 'The password has been successfully changed!',
    flag: 'change-password-success',
    Component: <ChangePasswordSuccess/>,
  },
];
