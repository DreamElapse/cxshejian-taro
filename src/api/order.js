import request from '@/utils/api'

export default {
  // 获取订单列表
  getOrderList(data, loading) {
      const url = `/ziwoyou/product/12306/products`
      return request.get({ url, data, loading })
  },
  // 用户授权
  verifyAuth(data) {
    const url = `/auth`
    return request.get({ url, data })
  },
  // 催单
  reminder(data) {
    const url = `/auth`
    return request.get({ url, data })
  }



}
