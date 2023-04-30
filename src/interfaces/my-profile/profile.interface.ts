import { INewsletterData } from './newsletter-data.interface';

export interface IProfile {
  email: string
  name: string
  phone: string
  avatar: string
  is2faEnabled: boolean
  newsletters: INewsletterData[]
  rate: number
}
