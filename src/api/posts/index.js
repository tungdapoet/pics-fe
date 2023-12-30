import {get, post, put, postMultipart} from '../../helpers/api_helpers'

export const createPost = (body) => postMultipart(`/post/CreatePost`, body)

export const updatePost = (body) => put(`/post/UpdatePost`, body)

export const deletePost = (id) => put(`/post/DeletePost/${id}`)

export const createComment = (body) => post(`/post/CreateComment`, body)

export const getAllPost = (params) => get(`/post/GetAllPost`, params)

export const getPostByUser = (id, params) => get(`/post/GetPostByUser/${id}`, params)

export const getPostByTitle = (params) => get(`/post/GetPostByTitle`, params)

export const sharePost = (id) => post(`/post/SharePost/${id}`)

export const downloadImageForPost = (postId) => post(`/post/DownloadImageForPost`, null, {params: {postId}})

export const getPostById = (id) => get(`/post/GetPostById/${id}`)



