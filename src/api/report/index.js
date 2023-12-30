import {get, post} from '../../helpers/api_helpers';

export const createReport = (body) => post(`/report/CreateReport`, body)

export const createReportUser = (body) => post(`/report/CreateReportUser`, body)

export const getAllReport = () => get(`/report/GetAllReport`)

export const getAllReportByPost = (id) => get(`/report/GetAllReportByPost/${id}`)

