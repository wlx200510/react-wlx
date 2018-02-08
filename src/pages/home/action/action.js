import * as home from './action-type';
import {actionCreator as makeActionCreator} from '@/utils/actionCreator'
// 尝试用最佳实践来生成Action (Action Creators)

// 保存表单数据
export const saveFormData = makeActionCreator(home.SAVEFORMDATA, 'value', 'datatype')
export const saveImg = makeActionCreator(home.SAVEIMG, 'path') // 保存图片地址
export const clearData = makeActionCreator(home.CLEARDATA) // 保存图片地址
