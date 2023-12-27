import {del, get, post, put} from '../../helpers/api_helpers'

export const getAllUser = (params) => get(`/user/GetAllUsers`, params)

export const getUserByName = (params) => get(`/user/GetUserByName`, params)

export const updateUser = (body) => put(`/user/UpdateUser`, body)

export const deleteUser = (id) => put(`/user/DeleteUser/${id}`)

