export interface ISavedSearch {
  id: string
  type?: string
  actionType?: string
  homeTypes?: string
  priceFrom?: number
  priceTo?: number
  beds?: string
  areaFrom?: number
  areaTo?: number
  baths?: string
  yearFrom?: number
  yearTo?: number
  airConditioner?: boolean
  name?: string
  date?: string
  location: { lat: number, lng: number }
}
