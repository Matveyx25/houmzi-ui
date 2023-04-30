export interface IAgent {
  id: string
  name: string
  avatar: string
  rate: number
  email: string
  phone: string
  reviewsCount: number
  listings: {
    id: string
    avatar: string
  }[]
}
