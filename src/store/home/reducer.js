import * as home from '@/pages/home/action/action-type';

let defaultState = {
  orderSum: '', //金额
  name: '', //姓名
  phoneNo: '', //手机号
  imgpath: '', //图片地址
}
// 首页表单数据

const ACTION_HANDLERS = { //里面的函数逻辑可以写得更复杂 用ES6的类属性指定
  [home.SAVEFORMDATA] : (state, action) => ({...state, [action.datatype]: action.value}),
  [home.SAVEIMG]: (state, action) => ({...state, imgpath: action.path}),
  [home.CLEARDATA]: (state, action) => ({...state, ...defaultState})
}

// 这个函数的本质是reducer
export function formData(state = defaultState, action = {}) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
