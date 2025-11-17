import axios from 'axios'

const request = axios.create(
    {
        baseURL: "/api",
        timeout: 5000
    }
)

request.interceptors.request.use(
    config => {
        if( config && config.headers ) {
            config.headers['Accept'] = 'application/json'
            config.headers['Content-Type'] = 'multipart/form-data'
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


request.interceptors.response.use(
    response => {
        let res = response.data;
        if( response.status == 200 ){
            if( response.config.responseType === 'blob' ) {
                return res
            }    
            if( typeof res === 'string') {
                res = res ? JSON.parse(res) : res
            }
        }
        return res
    },
    error => {
        return Promise.reject(error)    
    }
)

export default request