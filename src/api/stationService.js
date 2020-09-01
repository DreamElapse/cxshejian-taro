import request from '@/utils/api'

export default {
    // 获取车次整体数据
    getDetailByTrainNo(data,loading) {
        const url = `/wtkj/vega-station/schedule/detailByTrainNo`
        return request.get({ url, data,loading })
    },

    // 获取站站数据
    getStationToStationByTrainNo(data,loading) {
        const url = `/wtkj/vega-station/schedule/detailByTrainNoMiniApp`
        return request.post({ url, data ,loading})
    },
    // 获取所有城市数据
    getAllCityAndStation(data,loading) {
        const url = `/wtkj/vega-station/dicChina/getAllCityAndStation`
        return request.get({ url, data,loading })
    },
    // 获取热门城市数据
    getHotCity(data,loading) {
        const url = `/wtkj/vega-station/dicChina/getHotCity`
        return request.get({ url, data,loading })
    },
    // 获取所在城市数据
    getCityForLngLat(data,loading) {
        const url = `/wtkj/vega-station/Gaode/getCityForLngLat`
        return request.get({ url, data,loading })
    },
    // 获取站站数据
    getTrainsDetailListMiniApp(data,loading) {
        const url = `/wtkj/vega-station/schedule/getTrainsDetailListMiniApp`
        return request.post({ url, data,loading })
    },
    // 获取最近站点
    getNearStation(data,loading) {
        const url = `/weitaikeji/vega-station/Station/getNearStation`
        return request.get({ url, data,loading })
    },
    // 获取最近站点
    getHotStation(data,loading) {
        const url = `/weitaikeji/vega-station/Station/getHotStation`
        return request.get({ url, data,loading })
    },
    // 获取搜索列表数据
    getScreenList(data,loading) {
        const url = `/wtkj/vega-station/vehiclenavigation/getScreenListNew`
        return request.get({ url, data,loading })
    },
    // 获取乘车列表
    getScreenListNew(URL,data,loading) {
      let url = `/wtkj${URL}`
      return request.get({ url, data, loading })
    },
}
