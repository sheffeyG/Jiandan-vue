import { createRouter, createWebHashHistory } from "vue-router";

const PreviewImageList = () => import('../page/PreviewImageList.vue')
const NewsDetail = () => import('../page/news/NewsDetail.vue')
const Home = () => import('../page/Home.vue')
const NewsCommentList = () => import('../page/news/CommentList')
const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },

    {
        path: '/preview-image-list',
        component: PreviewImageList,
        name: 'previewImage'
    },
    {
        path: '/news-detail',
        component: NewsDetail,
        name: 'newsDetail'
    },
    {
        path: '/news-comment-list',
        component: NewsCommentList,
        name: 'newsCommentList'
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;