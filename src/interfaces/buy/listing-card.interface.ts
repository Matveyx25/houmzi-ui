export interface IListingCard {
  id: string
  avatar?: string
  price?: number
  date: string
  address: string
  beds?: string
  baths?: string
  squareFeet?: number
  lat: number
  lng: number
  isFavorite: boolean
  actionType: string
}

export interface IListingCardWithClusterId extends IListingCard {
  clusterId: string
}
