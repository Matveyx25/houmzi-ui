export interface IArticleCard {
  id: number
  title: string
  avatar: string
}

export interface IArticleCardFull extends IArticleCard {
  content: string
  author: IAuthor | number
  date: string
}

export interface IArticle extends IArticleCardFull {
  categoryId: number
}

export interface ICategory {
  id: string
  name: string
  articles: IArticleCardFull[]
}

export interface IAuthor {
  id: number
  name: string
  avatar: string
}
