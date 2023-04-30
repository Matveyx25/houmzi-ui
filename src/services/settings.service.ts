import { IChangePasswordData } from '../interfaces/settings/change-password-data.interface';
import { axiosWithContext } from '../helpers/axios.config';

const baseUrl: string = 'user/profile';

export const changePassword = (changePasswordData: IChangePasswordData): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/change-password`, changePasswordData);

export const enableTwoFactor = (phone: string): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/2fa/enable`, { phone });

export const disableTwoFactor = (): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/2fa/disable`);

export const deleteAccount = (): Promise<any> =>
  axiosWithContext(null).delete(baseUrl);
