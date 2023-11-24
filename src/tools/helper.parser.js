import katex from 'katex';
import { NOTATION } from '../consts';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';

export const markToHtml = function(text) {

    let renderedText = unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeKatex, {
            throwOnError: false,
            macros: NOTATION
        })
        .use(rehypeStringify)
        .process(text)

    return renderedText;
}

export const latexToHtml = function(latex) {
    return katex.renderToString(latex, {
        throwOnError: false,
        macros:NOTATION,
        displayMode: true
    });
}

