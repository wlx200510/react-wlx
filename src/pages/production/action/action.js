import * as pro from './action-type';
import API from '@/api/api';
import {actionCreator as makeActionCreator, actionDispatch} from '@/utils/actionCreator'

// 初始化获取商品数据，保存至redux
export const getProData = () => {
  // 返回函数，异步dispatch 还可以传入第二个参数getState
  return async dispatch => {
    try{
      let result = await API.getProduction();
      result.map(item => {
        item.selectStatus = false;
        item.selectNum = 0;
        return item;
      })
      actionDispatch(pro.GETPRODUCTION, 'dataList')(dispatch, result)
    }catch(err){
      console.error(err);
    }
  }
}

export const togSelectPro = makeActionCreator(pro.TOGGLESELECT, 'index') //选择商品
export const editPro = makeActionCreator(pro.EDITPRODUCTION, 'index', 'selectNum') //编辑商品
export const clearSelected = makeActionCreator(pro.CLEARSELECTED) //清空选择

// 示例的样板代码 便于看懂
// export const tempFoo = (index, bar) => {
//   return {
//     type: pro.foo,
//     index,
//     bar
//   }
// }