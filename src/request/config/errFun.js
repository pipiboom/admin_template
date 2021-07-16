import { Message } from 'element-ui'
let constObj = require(resolve('src/assets/const'));

let messageInstance = null;
const rewriteMessage = (options) => {
	if (messageInstance) {
		messageInstance.close()
	}
	messageInstance = Message(options)
}
['error', 'success', 'info', 'warning'].forEach(type => {
	rewriteMessage[type] = options => {
		if (typeof options === 'string') {
			options = {
				message: options,
				showClose: true
			}
		}
		options.type = type
		return rewriteMessage(options)
	}
})

//错误提示中使用
function handleError(data) {
	rewriteMessage.error(data.message);
	return window.Promise.reject(data)
}

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
			handleError({ message: '网络请求不存在', type: 'warning' })
			break
		default:
			handleError({ message: msg, type: 'warning' })
			break;
	}
}
