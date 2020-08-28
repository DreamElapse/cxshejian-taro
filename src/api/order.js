import request from '@/utils/api'

export default {
  // 获取订单列表
  getOrderList(data, loading) {
    const url = `/api/miniapp/api/trainOrder/page`
    return request.get({ url, data, loading })
  },
  // 用户授权
  verifyAuth(data) {
    const url = `/auth`
    return request.get({ url, data })
  },
  // 催单
  reminder(data) {
    const url = `/api/miniapp/api/trainOrder/urge`
    return request.get({ url, data })
  },
  // 订单详情
  getOrderDetail(data, loading) {
    const url = `/api/miniapp/api/trainOrder/detail`
    return request.get({ url, data, loading })
  }


}
