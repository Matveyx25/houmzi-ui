export interface ICard {
  img: string
  title: string
  text: string
  link: string
  desc?: string
  btn: {
    link: string
    text: string
  }
}
