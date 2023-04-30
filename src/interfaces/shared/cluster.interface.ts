import { IListingCard } from '../buy/listing-card.interface';

export interface ICluster {
  id: string
  lat: number
  lng: number
  numPoints: number
  points: IListingCard[]
}
