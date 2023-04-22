import axios from 'axios';
import qs from 'qs';


const service = axios.create({
    withCredentials: true,

});

service.interceptors.request.use(config => {
    const { method } = config;

    if (method.toUpperCase() === 'POST' ) {
        config.data = qs.stringify(config.data);
    }
    return config;
});

service.interceptors.response.use(
    response => response.data,
    error => {
        // const { response = {} } = error;
        // const { status, data = {}, statusText } = response;
        // const errorMsg = data.error_msg || statusText;

        console.log(error)

        return Promise.reject(error);
    }
);

export default service;
