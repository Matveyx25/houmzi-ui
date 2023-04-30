import { axiosWithContext } from '../helpers/axios.config';
import { IFormData } from '../interfaces/help/form-data.interface';

const baseUrl: string = 'help';

export const sendForm = (formData: IFormData): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/send`, formData);
