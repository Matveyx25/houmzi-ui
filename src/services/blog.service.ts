import { axiosBlog, blogUrl } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { IArticle, IArticleCard, IArticleCardFull, IAuthor, ICategory } from '../interfaces/blog.interfaces';

const baseUrl = '/blog';

export const getArticles = (): Promise<IArticleCard[]> =>
  axiosBlog.get(baseUrl)
    .then((res: AxiosResponse) => res.data.content
        .map(({ id, title, attachment }) => {
          return { id, title, avatar: getAvatar(attachment) }
        })
      );


export const getCategories = (): Promise<ICategory[]> =>
  axiosBlog.get(baseUrl + '/tags')
    .then((res: AxiosResponse) => res.data.content
      .map(({ id, name }) => {
          return {id, name, articles: []}
        },
      ),
    );

    

export const getCategory = (id: string): Promise<IArticleCardFull[]> =>
  axiosBlog.get('/blog', {params: {tags: id}})
    .then((res: AxiosResponse) => {
     const result = res.data.content
      .map(({ id, title, body, attachment, createdAt }) => ({
        id, title, avatar: getAvatar(attachment), content: body, author: null, date: createdAt,
      }))
    return result
    }
);

export const getArticle = (id: string): Promise<IArticle> =>
  axiosBlog.get(`/blog/${id}`)
    .then(async (res: AxiosResponse) => {
      if (res.data) {
        const { id, title, body, attachment, createdAt, tags } = res.data;

        return ({
          id, title, avatar: getAvatar(attachment), content: body,
          author: null, date: createdAt, categoryId: null,
        });
      }
    });

export const getNearbyArticles = (id: string): Promise<{prev: IArticleCard | null, next: IArticleCard | null}> =>
  axiosBlog.get(`/blog/${id}/nearby`)
    .then(async (res: AxiosResponse) => {
      const responseArray = {prev: null, next: null}
      if (res.data.prev.content.length) {
        const prevRes = res.data.prev.content[0]
        responseArray['prev'] = {id: prevRes.id, title: prevRes.title, avatar: getAvatar(prevRes.attachment)}
      }
      if (res.data.next.content.length) {
        const nextRes = res.data.next.content[0]
        responseArray['next'] = {id: nextRes.id, title: nextRes.title, avatar: getAvatar(nextRes.attachment)}
      }
      
      return responseArray
    }
  );


export const getInterestedArticles = (id: string): Promise<IArticleCardFull[]> =>
  axiosBlog.get(`/blog/${id}/interested`).then(
    async (res: AxiosResponse) => {
      return res.data.content.map(({ id, title, body, attachment, createdAt }) => ({
        id, title, avatar: getAvatar(attachment), content: body, author: null, date: createdAt,
      }))
    }
  );

export const getAuthors = (): Promise<IAuthor[]> =>
  axiosBlog.get('/authors')
    .then((res: AxiosResponse) => res.data.map(({ id, name, avatar }) => ({
        id, name, avatar: getAvatar(avatar),
      }),
    ));

const getAuthor = ({ id, name, avatar }): IAuthor => ({
  id, name,
  avatar: getAvatar(avatar),
});

const getAvatar = (avatar): string =>{
  return  avatar ? avatar : null;
}
