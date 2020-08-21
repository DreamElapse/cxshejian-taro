import request from '@/utils/api'

export default {
    // 商品推荐列表
    getListData(data, loading = false) {
        const url = `/mtourists-core/product/products`
        return request.get({ url, data, loading })
    },
    getCity(data, loading = false) {
        const url = ``
        return request.get({ url, data, loading})
    }
}
