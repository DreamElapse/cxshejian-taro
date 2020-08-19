import request from '@/utils/api'

export default {
    // 获取列表信息
    getListData(data, loading = false) {
        const url = `/list`
        return request.get({ url, data, loading })
    },
    getCity(data, loading = false) {
        const url = ``
        return request.get({ url, data, loading})
    }
}