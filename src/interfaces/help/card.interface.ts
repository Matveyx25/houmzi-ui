export interface ICard {
  icon?: string
  title: string
  articles: IArticle[]
}

export interface IArticle {
  title: string
  link: string
}
