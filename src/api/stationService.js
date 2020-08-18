import request from '@/utils/api'

export default {
    // 获取车次整体数据
    getDetailByTrainNo(data) {
        const url = `/vega-station/schedule/detailByTrainNo`
        return request.get({ url, data })
    },

    // 获取站站数据
    getStationToStationByTrainNo(data) {
        const url = `/vega-station/schedule/detailByTrainNoMiniApp`
        return request.post({ url, data })
    }
}