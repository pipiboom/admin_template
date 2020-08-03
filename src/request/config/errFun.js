import { Message } from 'element-ui'
let constObj = require(resolve('src/assets/const'));
export function errFun(err) {
	let errInfo = {};
	if (err.status) {
		errInfo.code = err.status;
		if ((err.data && err.data.message) || (err.data && err.data.msg)) {
			errInfo.msg = err.data.message || err.data.msg
		} else {
			errInfo.msg = err.statusText;
		}
	} else {
		errInfo = err;
	}
	// 默认错误提示
	let msg = errInfo.msg || errInfo.errmsg || errInfo.message || '';
	if (msg === "" || !msg) {
		msg = '服务器异常，请稍后重试';
	}
	let code = errInfo.code || errInfo.errcode;
	code = parseFloat(code);
	switch (code) {
		case 401:
			window.location.href = constObj.REDICT_URL;
			break;
		case 404:
			Message({ message: '网络请求不存在', type: 'warning' })
			break
		default:
			Message({ message: msg, type: 'warning' })
			break;
	}
}
