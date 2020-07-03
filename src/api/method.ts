import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const createHttp = () => {
    const config = {
        baseURL: "",
        // baseURL: process.env.baseURL || process.env.apiUrl || ""
        // timeout: 60 * 1000, // Timeout
        // withCredentials: true, // Check cross-site Access-Control
    };

    const _axios = axios.create(config);

    _axios.interceptors.request.use(config => {
        // @ts-ignore
        if (window['userToken']) {
            // 让每个请求携带自定义token 请根据实际情况自行修改
            // @ts-ignore
            config.headers['X-Token'] = window['userToken'];
        }
        return config
    }, error => {
        console.log(error); // for debug
        return Promise.reject(error)
    });

    // Add a response interceptor
    _axios.interceptors.response.use(
        function (response) {
            // Do something with response data
            return response;
        },
        function (error) {
            // Do something with response error
            return Promise.reject(error);
        }
    );

    return _axios;
};

export default createHttp