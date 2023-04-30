import { axiosWithContext } from '../helpers/axios.config';

export const sendLinkToEmail = (email: string, message: string) =>
  axiosWithContext().post('help/share', { email, message });
