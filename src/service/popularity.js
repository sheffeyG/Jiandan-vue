import request from "../utils/request";


// 树洞列表
const getPopularityDefault = ()=>{
    return request({
        method:'GET',
        url:'/jiandan/api/v1/comment/list/102312'
    })
}
const getPopularityWithStartId=(start_id)=>{
    return request({
        method:'GET',
        params:{
            start_id:start_id
        },
        url:'/jiandan/api/v1/comment/list/102312'
    })
}
const votePositive = (comment_id)=>{
    console.log("votePositive,",comment_id)
    return request({
        method:'POST',
        url:'/news_api/api/comment/vote',
        data:{
            comment_id,
            like_type:'pos',
            data_type:'comment'
        }
    })
}
const voteNegative = (comment_id)=>{
    return request({
        method:'POST',
        url:'/news_api/api/comment/vote',
        data:{
            comment_id,
            like_type:'neg',
            data_type:'comment'
        }
    })
}
const postComment = (data)=>{
    // console.log("postComment",data)
    return request({
        method:'POST',
        url:'/news_api/api/tucao/create',
        data
    })
}

export default {getPopularityDefault,getPopularityWithStartId,votePositive,voteNegative,postComment}