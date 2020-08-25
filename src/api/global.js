import request from '@/utils/api'

export default {
  getCity(data) {
      const url = ``
      return request.get({ url, data})
  },
  changeUserInfo(data) {
    const url = ``
    return request.get({ url, data})
  },
  verifyAuth(data) {
    const url = ``
    return request.get({ url, data})
  },
  // 用户登录
  login(data) {
    const url = `/api/miniapp/api/login/wechatLogin`
    return request.post({ url, data, loading: false})
  },

}
