import {
  Message
} from 'element-ui'
import Vue from 'vue'

const globals = {
  // 数字转换枚举值
  /**
   * 
   * @param {枚举值数组} arr 
   * @param {当前值} value 
   * @param {Multiple： 是否多选，splitLab： 多选时的分割符， label：枚举值数组的键名， val： 枚举值数组的值名, noMatchTip: 没有匹配值时的提示} param2 
   */
  transfer(arr, value, {
    Multiple = '',
    splitLab = ',',
    label = 'label',
    val = 'value',
    noMatchTip = ''
  } = {}) {
    if (!arr) {
      return '';
    }
    if (!value && String(value) !== '0') {
      return ''
    }
    if (Multiple && value.indexOf(`${splitLab}`) > -1) {
      let valueArr = value.split(`${splitLab}`);
      let str = '';
      valueArr.forEach(item => {
        let arrItem = arr.find(itemChild => {
          return itemChild[val] == item;
        });
        str += (arrItem ? arrItem[label] : noMatchTip) + ',';
      });
      return str.substr(0, str.length - 1);
    } else {
      let item = arr.find(item => {
        return item[val] == value;
      });
      return item ? item[label] : noMatchTip;
    }
  },
  // 操作二次确认
  tipFun(tip = '您确定要删除吗?') {
    return new Promise((resolve) => {
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resolve();
      }).catch(() => {
        this.$openMessage('取消', 'info');
      });
    })
  },
  // 数字检验
  numberOnly: (value) => {
    return value.replace(/[^\d^.]+/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  },
  // 长度校验
  validSe: (value, number = 255) => {
    value = value.replace(/[`～*~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "")
    if (value.length >= number) {
      Message({
        type: "warning",
        message: `输入内容不能超过${number}个字符`
      })
    }
    return value
  },
  // 整数校验
  onlyInt: (value) => {
    return value.length === 1 ? value.replace(/[^1-9]\d*/g, '') : value.replace(/[^\d]/g, '')
  },
  // 全局弹窗
  $openMessage: (msg, type = 'success') => {
    Message({
      message: msg,
      type: type,
      showClose: true
    })
  },
  // 权限校验
  hasPermission: (userPermission = '') => {
    let permissionList = sessionStorage.getItem('permissionList') || []
    if (permissionList.length !== 0) {
      permissionList = JSON.parse(permissionList)
    }
    let userName = sessionStorage.getItem('userName')
    if (userName === "administrator") {
      return true
    } else {
      return permissionList.includes(userPermission) || false
    }
  }
}

// 全局注册
for (let k in globals) {
  Vue.prototype[k] = globals[k]
}