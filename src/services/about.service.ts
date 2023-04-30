import { axiosWithContext } from '../helpers/axios.config';
import { IFormData } from '../interfaces/about/form-data.interface';

const baseUrl: string = 'about';

export const sendForm = (formData: IFormData): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/send`, formData);
