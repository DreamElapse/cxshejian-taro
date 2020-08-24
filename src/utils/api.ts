import { request, showLoading, hideLoading, showToast } from '@tarojs/taro'

class API {
  // 四种请求方式
  get(args) {
    return this.http(args, 'GET')
  }
  post(args) {
    return this.http(args, 'POST')
  }
  put(args) {
    return this.http(args, 'PUT')
  }
  delete(args) {
    return this.http(args, 'DELETE')
  }


  // api控制器
  http(args, method = 'GET') {
    let { url, data, loading=false, toast=false } = args

    url = this.resetUrl(url)
    // loading
    loading && showLoading({ title: '加载中...', mask: true })
    // 判断请求类型
    let contentType
    // GET请求
    if (method === 'GET') {
      contentType = 'application/json'
      // POST 请求
    } else if (method === 'POST') {
      contentType = 'application/x-www-form-urlencoded'
    }

    // 用户token
    // let Authorization = Taro.getStorageSync('token') || ''
    let _this = this
    return new Promise((resolve, reject) => {
      request({
        url,
        data,
        method,
        header: {
          'content-type': contentType,
          'X-Authorization': 'Bearer 06764f6f3f9098c31979ab6e6a837267',
          // Authorization,
        },
        // 请求成功回调
        success(res) {
          resolve(_this.beforeResponse(res.data, toast))
        },
        // 失败回调
        fail(res) {
          toast && showToast({title: res.data.msg || res.data.message})
          reject(res.data)
        },
        // 成功失败都回调
        complete: () => {
          // 请求次数递减
          // this.reqNum--
          // if (_this.reqNum === 0) {
          //   loading && hideLoading()
          // }
          loading && hideLoading()
        },
      })
    })
  }
  // 修改请求地址
  resetUrl(url) {
    let defaultUrl = ''
    // 所有接口域名地址配置
    let urlOptions = [
      {
        code: '/api', // 公司内部接口
        apiUrl: process.env.API_URL
      },
      {
        code: '/wetaikeji', // 武汉威泰行程接口
        apiUrl: process.env.API_VEGA_STATION
      },
      {
        code: '/ziwoyou', // 自我游接口
        apiUrl: process.env.API_ZIWOYOU
      }
    ]
    urlOptions.forEach(item => {
      url.includes(item.code) && (defaultUrl = item.apiUrl + url.replace(item.code, ''))
    })
    return defaultUrl
  }

  // 响应拦截
  beforeResponse(res, toast) {
    if (+res.error !== 0 || +res.state !== 1) {
      toast && showToast({title: res.message})
    }
    return res
  }
}

export default new API()
