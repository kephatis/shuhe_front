import axiosReqest from '../axiosReq'
import type { ApiResponse } from '../axiosRsp'


export const httpMemberIndex = (): Promise<ApiResponse> => {
    return axiosReqest({
        url: '/smartweb/app/member/index',
        method: 'post',
        data: {}
    }) as Promise<ApiResponse>
}


export const httpMemberCompleteOnceAd = (memberId:string, type:string): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append('memberId', memberId);
    formData.append('type', type);

    return axiosReqest({
        url: '/smartweb/app/member/completeOnceAd',
        method: 'post',
        data: formData
    }) as Promise<ApiResponse>
}

export const httpMemberMemberListAd = (pageNum:number, pageSize:number, searchText:string): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append('pageNum', pageNum.toString());
    formData.append('pageSize', pageSize.toString());
    formData.append('searchText', searchText);

    return axiosReqest({
        url: '/smartweb/app/member/memberListAd',
        method: 'post',
        data: formData
    }) as Promise<ApiResponse>
}

export const httpMemberInfoListAd = (pageNum:number, pageSize:number, searchText:string): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append('pageNum', pageNum.toString());
    formData.append('pageSize', pageSize.toString());
    formData.append('searchText', searchText);

    return axiosReqest({
        url: '/smartweb/app/member/infoListAd',
        method: 'post',
        data: formData
    }) as Promise<ApiResponse>
}

export const httpMemberMoneyMy = (): Promise<ApiResponse> => {
    return axiosReqest({
        url: '/smartweb/app/member/moneyMy',
        method: 'post'
    }) as Promise<ApiResponse>
}

export const httpMemberInfoMy = (): Promise<ApiResponse> => {
    return axiosReqest({
        url: '/smartweb/app/member/infoMy',
        method: 'post'
    }) as Promise<ApiResponse>
}

export const httpMemberDealListMy = (): Promise<ApiResponse> => {
    return axiosReqest({
        url: '/smartweb/app/member/dealListMy',
        method: 'post'
    }) as Promise<ApiResponse>
}

export const httpMemberChangePasswordMy = (oldPassword:string, newPassword:string): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append('oldPassword', oldPassword);
    formData.append('newPassword', newPassword);

    return axiosReqest({
        url: '/smartweb/app/member/changePasswordMy',
        method: 'post',
        data: formData
    }) as Promise<ApiResponse>
}

export default {
    httpMemberIndex,
    httpMemberCompleteOnceAd,
    httpMemberMemberListAd,
    httpMemberInfoListAd,
    httpMemberMoneyMy,
    httpMemberInfoMy,
    httpMemberDealListMy,
    httpMemberChangePasswordMy
}