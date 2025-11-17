import axiosReqest from '../axiosReq'
import type { ApiResponse } from '../axiosRsp'

export interface httpAuthLoginRequest {
    username: string
    password: string
}

export interface httpAuthLoginResponse {
    token: string
    userInfo: {
        memberId: string
        memberName: string
        roles: string[]
    }
}

export const httpAuthLogin = (data: httpAuthLoginRequest): Promise<ApiResponse<httpAuthLoginResponse>> => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    return axiosReqest({
        url: '/smartweb/api/auth/login',
        method: 'post',
        data: formData
    }) as Promise<ApiResponse<httpAuthLoginResponse>>
}

export const httpAuthLogout = (): Promise<ApiResponse> => {
    return axiosReqest({
        url: '/smartweb/api/auth/logout',
        method: 'post'
    }) as Promise<ApiResponse>
}


export default {
    httpAuthLogin,
    httpAuthLogout
}