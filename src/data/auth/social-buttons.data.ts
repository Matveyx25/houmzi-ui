import { ISocialButton } from '../../interfaces/auth/social-button.interface';

export const socialButtons: ISocialButton[] = [
  {
    icon: 'icon-facebook3',
    className: 'facebook',
    link: 'https://api.dev.houmzi.ru/api/auth/login/facebook',
  },
  {
    icon: 'icon-google2',
    className: 'google',
    link: 'https://api.dev.houmzi.ru/api/auth/login/google',
  },
  {
    icon: 'icon-apple',
    className: 'apple',
    link: '',
  },
];
