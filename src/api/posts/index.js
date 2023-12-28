import {del, get, post, put} from '../../helpers/api_helpers'

export const createPost = (body) => post(`/post/CreatePost`, body)

export const updatePost = (body) => put(`/post/UpdatePost`, body)

export const createComment = (body) => post(`/post/CreateComment`, body)

export const getAllPost = (params) => get(`/post/GetAllPost`, params)

export const getPostByUser = (id, params) => get(`/post/GetPostByUser/${id}`, params)

export const sharePost = (id) => post(`/post/SharePost/${id}`, null)

export const downloadImageForPost = (postId) => post(`/post/DownloadImageForPost`, null, {params: {postId}})

export const deleteComment = (body) => put(`/post/DeleteComment`, body)

export const getCommentByUser = (id, params) => get(`/post/GetCommentByUser/${id}`, params)

export const getPostById = (id) => get(`/post/GetPostById/${id}`)

export const updateComment = (commentId, body) => put(`/post/UpdateComment`, body, {params:{commentId}})

export const userLikeComment = (id) => post(`/post/UserLikeComment/${id}`, null)


