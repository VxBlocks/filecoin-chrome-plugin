import axios from 'axios';
import { BASE_URL } from './global';

const serverConfig = {
  baseURL:BASE_URL,
  useTokenAuthorization:false
}

const serviceAxios = axios.create({
	baseURL: serverConfig.baseURL,
	timeout: 25000,
	headers: {
		"Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.jUOhJQQyR861i5_gWhTF_wXFKZ_W-2Yd_mD2zVpfg0U"
	},
});

/**
 * 请求拦截
 * */
serviceAxios.interceptors.request.use(
	(config) => {
		
		// console.log("请求配置", config);
		// 是否使用 Token
		if (serverConfig.useTokenAuthorization) {
			// @ts-ignore
			config.headers["Authorization"] = localStorage.getItem("token");
		}
		// 设置请求头
		if (config.method === "post") {
			// @ts-ignore
			config.headers["content-type"] = "application/x-ww-form-urlencoded";
			// config.data = qs.stringify(config.data); //序列化  效果等同于下行代码
			// @ts-ignore
			config.requestType = "form";
		} else {
			// @ts-ignore
			config.headers["content-type"] = "application/json";
		}
		// 返回
		// @ts-ignore
		config.headers["net"] = sessionStorage.getItem("net");
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);


export async function request(url:string, method: "GET" | "POST",  options?: Object) {
  if(method == 'GET'){
    return serviceAxios({
      url,
      method,
      params:options

    })
  }else{
    return serviceAxios({
      url,
      method,
      data:options

    })
  }
}
