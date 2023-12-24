import {del, get, post, put} from '../../helpers/api_helpers'

export const getAllUser = (config) => get(`/user/GetAllUsers`, config)

export const getUserByName = (config) => get(`/user/GetUserByName`, config)

export const updateUser = (body) => put(`/user/UpdateUser`, body)

export const deleteUser = (id) => put(`/user/DeleteUser/${id}`)

