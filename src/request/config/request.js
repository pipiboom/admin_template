import axios from 'axios'
import { errFun } from './errFun'

// 拦截请求信息
axios.interceptors.request.use((config) => {
	return config;
}, (err) => {
	console.log('err:', err);
	errFun(err);
});

// 拦截响应信息
axios.interceptors.response.use((response) => {
	const data = response.data;
	// 查看请求是否需要直接返回结果集
	if (response.config && response.config.headers.unresponse) {
		return data;
	}
	if (data.code === '0') {
		return data;
	} else {
		errFun(data);
		return false;
	}
}, (err) => {
	errFun(err.response);
	return false;
});

export default function axiosAjax(config) {
	return new Promise((resolve, reject) => {
		axios(config).then((result) => {
			resolve(result);
		}).catch(() => {
			resolve(false);
		});
	});
};
