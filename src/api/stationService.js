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
    },
    // 获取所有城市数据
    getAllCityAndStation(data) {
        const url = `/vega-station/dicChina/getAllCityAndStation`
        return request.get({ url, data })
    },
    // 获取热门城市数据
    getHotCity(data) {
        const url = `/vega-station/dicChina/getHotCity`
        return request.get({ url, data })
    },
    // 获取所在城市数据
    getCityForLngLat(data) {
        const url = `/vega-station/Gaode/getCityForLngLat`
        return request.get({ url, data })
    }
}