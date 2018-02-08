import * as pro from '@/pages/production/action/action-type';
import Immutable from 'immutable';

let defaultState = {
  /**
   * 商品数据
   * @type {Array}
   * example: [{
   *    product_id: 1, 商品ID 
   *    product_name: "PaiBot（2G/32G)", 商品名称
   *    product_price: 2999, 商品价格
   *    commission: 200, 佣金
   *    selectStatus: false, 是否选择
   *    selectNum: 0, 选择数量
   * }]
   */
  dataList: [],
}
let imuDataList, imuItem;
const ACTION_HANDLERS = { //里面的函数逻辑可以写得更复杂 用ES6的类属性指定
  [pro.GETPRODUCTION] : (state, action) => ({...state, ...action}),
  [pro.TOGGLESELECT]: (state, action) => {
    //避免引用类型数据，使用immutable进行数据转换
    imuDataList = Immutable.List(state.dataList);
    imuItem = Immutable.Map(state.dataList[action.index]);
    imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'));
    imuDataList = imuDataList.set(action.index, imuItem);
    // redux必须返回一个新的state
    return {...state, ...{dataList: imuDataList.toJS()}};
  },
  [pro.EDITPRODUCTION]: (state, action) => {
    //避免引用类型数据，使用immutable进行数据转换 
    imuDataList = Immutable.List(state.dataList);
    imuItem = Immutable.Map(state.dataList[action.index]);
    imuItem = imuItem.set('selectNum', action.selectNum);
    imuDataList = imuDataList.set(action.index, imuItem);
    // redux必须返回一个新的state
    return {...state, ...{dataList: imuDataList.toJS()}};
  },
  [pro.CLEARSELECTED]: (state, action) => {
    imuDataList = Immutable.fromJS(state.dataList);
      for (let i = 0; i < state.dataList.length; i++) {
        imuDataList = imuDataList.update(i, item => {
          item = item.set('selectStatus', false);
          item = item.set('selectNum', 0);
          return item
        })
      }
      return {...state, ...{dataList: imuDataList.toJS()}};
  }
}

export const proData = (state = defaultState, action = {}) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}