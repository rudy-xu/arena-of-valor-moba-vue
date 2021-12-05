import axios from "axios";
import Vue from "vue";
import router from "./router/index";

const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
});

//interceptor to add authorization
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token)
    {
        config.headers.Authorization = "Bearer " + localStorage.token;
    }
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


//http interceptor, global handling of error reporting
http.interceptors.response.use(res => {
    return res;
}, err => {
    //console.log(err.response.data.message);
    if(err.response.data.message)
    {
        Vue.prototype.$message.error({
            type: "error",
            message: err.response.data.message
        });

        if(err.response.status === 401)
        {
            router.push("/login");
        }
    }
    return Promise.reject(err);
});

export default http;