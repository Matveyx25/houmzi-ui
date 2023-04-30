export interface IReview {
  id: string
  authorId: string
  avatar: string
  date: string
  name: string
  rate: number
  text: string
  newRate?: number
}
