import { IUser } from './user.interface';

export interface IListing {
  actionType: string
  additionalAmenities: string
  address: string
  airConditioner: boolean
  apartmentFloor: number
  avatar: string
  balcony: boolean
  baths: number
  beds: number
  built: number
  cats: boolean
  condition: string
  constructionType: string
  contactEmail: string
  contactName: string
  contactPhone: string
  cooling: number
  date: string
  dateAvailable: string
  deck: boolean
  description: string
  foundation: string
  furnished: boolean
  garageParking: boolean
  hardwoodFloor: boolean
  heatingSystem: string
  internet: string
  landArea: number
  laundryType: string
  leaseTerms: string
  location: { lat: number, lng: number }
  media: {
    id: string
    mimetype: string
    type: string
    url: string
  }[]
  mls: string
  noPets: boolean
  numberOfFloors: number
  offStreetParking: boolean
  parking: number
  porch: boolean
  price: number
  propertyType: string
  rentByType: string
  roof: string
  securityDeposit: number
  squareFeet: number
  views: number
  waterHeater: string
  wheelchairAccess: boolean
  favoritesCount: number
  isFavorite: boolean
  user: IUser
}
