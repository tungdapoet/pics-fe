import {del, get, post, put} from '../../helpers/api_helpers'

export const register = (body) => post(`/auth/Register`, body)

export const confirmCreateNewAccount = (body) => post(`auth/ConfirmCreateNewAccount`, body)


export const confirmCreateNewPassword = (body) => post(`auth/ConfirmCreateNewPassword`, body)

export const forgotPassword = (body) => post(`auth/ForgotPassword`, body)

export const changePassword = (body) => post(`auth/ChangePassword`, body)


export const login = (body) => post(`auth/Login`, body)

export const renewAccessToken = (body) => post(`auth/RenewAccessToken`, body)
