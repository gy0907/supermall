import {ADD_COUNTER,
ADD_TO_CART} from './mutation-types'

export default {
  // mutations唯一的目的就是修改state中的状态，并且它的每个方法完成的事件尽可能的单一
  // payload是传递过来的参数
  [ADD_COUNTER](state,payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  clickAllChecked (state, payload) {
    state.allCheckedFlag = payload
  },
  clickAllFlagTrue(state) {
    state.allCheckedFlag = true
  },
  clickAllFlagFalse(state) {
    state.allCheckedFlag = false
  }
}