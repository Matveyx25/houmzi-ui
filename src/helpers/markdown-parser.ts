// import { unified } from "unified";
// import html from "remark-html";
// import rehypeParse from "rehype-parse";
// import rehypeRemark from "rehype-remark";
// import remarkStringify from "remark-stringify";
import dynamic from 'next/dynamic';

const unified = dynamic(() => import('unified'),{ ssr: false });
const html = dynamic(() => import('remark-html'),{ ssr: false });
const rehypeParse = dynamic(() => import('rehype-parse'),{ ssr: false });
const rehypeRemark = dynamic(() => import('rehype-remark'),{ ssr: false });
const remarkStringify = dynamic(() => import('remark-stringify'),{ ssr: false });

export function markdownToHtml(markdownText: string) {
  const file = unified().use(html).processSync(markdownText);
  return String(file);
}

export function htmlToMarkdown(htmlText: string) {
  const file = unified()
    .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(htmlText);

  return String(file);
}