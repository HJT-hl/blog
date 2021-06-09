import MarkdownIt from 'markdown-it';
import hljs from "highlight.js"
import "./whitey.less"
const md =  new MarkdownIt({
    highlight: function (str:string, lang:string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {}
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
});

export function mdToHTML(value:string){
    return md.render(value)
}
