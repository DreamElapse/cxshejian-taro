import request from '@/utils/api'

export default {
  // 商品推荐列表
  getListData(data, loading) {
      const url = `/ziwoyou/mtourists-core/product/12306/products`
      return request.get({ url, data, loading })
  },
  // 获取定位
  getLocationCity(data) {
    const url = `/ziwoyou/mtourists-api/pddapi/index/getLocationCity`
    return request.get({ url, data })
  }


}
