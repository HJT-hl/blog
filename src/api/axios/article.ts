import  axios from './axios.config'
  //获取文章信息
export  function getArticleInfo () {
    return axios.post('/article/getInfo')
}

export  function getArticleHot (limit = 8) {
    return axios.post('/article/getHot', { limit })
}

//获取文章列表
export  const getArticleShow  = ( ()=> {
    let skip = 0
    let limit = 5

    return function (index = 0, ifFresh = false) {
        if (ifFresh) {
            skip = 0
            limit = 5
        }

        let tag = ['', 'HTML&Css', 'JavaScript', 'Node', 'Vue','React', 'Other'][index]

        let data = { skip, limit, tag }
        skip += limit
        return axios.post('/article/getShow', data)
    }
})()

//获取单篇文章信息
export  function getArticle (_id:string) {
    return axios.post('/article', { _id })
}

//获取延伸阅读
export  function getArticleExtend (tag:string) {
    return axios.post('/article/extend', { tag })
}

   //搜索文章
export function  getArticleSearch (keywords:string) {
    return axios.post('/article/search', { keywords })
}
