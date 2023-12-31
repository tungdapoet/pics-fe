import {get, put, putMultipart} from '../../helpers/api_helpers'

export const getAllUser = (params) => get(`/user/GetAllUsers`, params)

export const getUserByName = (params) => get(`/user/GetUserByName`, params)

export const getUserInformation = (id) => get(`/user/GetUserInformation/${id}`)

export const getUserById = (id) => get(`/user/GetUserById/${id}`)

export const updateUser = (body) => putMultipart(`/user/UpdateUser`, body)

export const deleteUser = (id) => put(`/user/DeleteUser/${id}`)



