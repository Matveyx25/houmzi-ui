export const stringToUrl = (str: string): string => str
  .replace(/[,./]/g, '')
  .replace(/ /g, '-')

export const urlToString = (url: string): string => url
  .replace(/-/g, ' ')
