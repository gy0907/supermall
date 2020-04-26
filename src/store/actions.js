import {ADD_COUNTER,
ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
    // find 方法找到符合条件返回数组项 正好oldProduct就是被返回的那一项然后count++
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })

  }
}