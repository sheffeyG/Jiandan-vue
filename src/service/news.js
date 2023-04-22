import request from "../utils/request";


// 新鲜事列表
const getNewsList = (pageNumber)=>{
    return request({
        method:'GET',
        params:{
            page:pageNumber
        },
        url:'/news_api/?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,excerpt,comment_count,comment_status,custom_fields&custom_fields=thumb_c,views&dev=1'
    })
}

const getNewsDetail = (newsId)=>{
    return request({
        url:"/news_api/",
        params:{
            id:newsId,
            include:'content,date,modified',
            oxwlxojflwblxbsapi:'get_post'
        },
        method :'GET'
    })
}
const getNewsCommentList = (newsId)=>{
    return request({
        url:'/news_api/',
        method:'GET',
        params:{
            oxwlxojflwblxbsapi:'get_post',
            id:newsId,
            include:'comments'

        }
    })
}

export default {getNewsList,getNewsDetail,getNewsCommentList}