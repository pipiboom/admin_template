import axiosAjax from '@/request/config/request'
// 是否直接返回结果集
// headers: {
//     unresponse: true
// },

// 获取用户信息
export function getAuthenticate(data) {
    return axiosAjax({
        headers: {
            unresponse: true
        },
        url: '/user/authentication',
        method: 'get',
        params: data
    })
}

export function getPermlist(data) {
    return axiosAjax({
        url: '/user/getPermList',
        method: 'post',
        data: data
    })
}