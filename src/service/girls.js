import request from "../utils/request";


// 妹子图列表
const getGirlsDefault = () => {
    return request({
        method: 'GET',
        url: '/jiandan/api/v1/comment/list/108629'
    })
}
const getGirlsWithStartId = (start_id) => {
    return request({
        method: 'GET',
        params: {
            start_id: start_id
        },
        url: '/jiandan/api/v1/comment/list/108629'
    })
}
const votePositive = (comment_id) => {
    console.log("votePositive,", comment_id)
    return request({
        method: 'POST',
        url: '/news_api/api/comment/vote',
        data: {
            comment_id,
            like_type: 'pos',
            data_type: 'comment'
        }
    })
}
const voteNegative = (comment_id) => {
    return request({
        method: 'POST',
        url: '/news_api/api/comment/vote',
        data: {
            comment_id,
            like_type: 'neg',
            data_type: 'comment'
        }
    })
}
const postComment = (data) => {
    // console.log("postComment",data)
    return request({
        method: 'POST',
        url: '/news_api/api/tucao/create',
        data
    })
}

export default { getGirlsDefault, getGirlsWithStartId, votePositive, voteNegative, postComment }