import { translitRuEn } from "./transliter"

const removeSmallWord = (str, limit = 3) => {
  let arr = str.split(" "); 
  let newArr = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].length >= limit) {
      newArr.push(arr[i]);
    }
  }
  let newStr = newArr.join(" ");
  return newStr; 
}


export const stringToUrl = (str: string): string => {
  const res = removeSmallWord(str.toLowerCase()).replace(/[,./]/g, '').replace(/ /g, '-')
  return translitRuEn(res)
}

export const urlToString = (url: string): string => url
  .replace(/-/g, ' ')
