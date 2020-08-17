import request from '@/utils/api'

export default {
    // 获取列表信息
    getListData(data) {
        const url = `/list`
        return request.get({ url, data })
    }
}