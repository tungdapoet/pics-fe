import {del, get, post, put} from '../../helpers/api_helpers'

export const getAllUser = (params) => get(`/user/GetAllUsers`, params)

export const getUserByName = (params) => get(`/user/GetUserByName`, params)

export const getUserByRole = (roleId) => get(`/user/GetUserByRole/${roleId}`)

export const getUserInformation = (id) => get(`/user/GetUserInformation/${id}`)

export const lockAccount = (id) => get(`/user/LockAccount/${id}`)
export const unlockAccount = (id) => get(`/user/UnLockAccount/${id}`)
export const getUserById = (id) => get(`/user/GetUserById/${id}`)

export const updateUser = (body) => put(`/user/UpdateUser`, body)

export const deleteUser = (id) => put(`/user/DeleteUser/${id}`)



