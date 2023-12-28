import {post, put} from '../../helpers/api_helpers'

export const authRegister = (body) => post(`/auth/Register`, body)

export const confirmCreateNewAccount = (body) => post(`auth/ConfirmCreateNewAccount`, body)


export const changePassword = (body) => put(`auth/ChangePassword`, body)


export const login = (body) => post(`auth/Login`, body)

