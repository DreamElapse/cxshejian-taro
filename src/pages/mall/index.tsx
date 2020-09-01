import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView } from '@tarojs/components'
import config from '../../utils/config'
import util from '../../utils/zowoyooutil'
import Taro,{ request , showToast ,getStorageSync } from '@tarojs/taro'
import pages from '../../utils/pages'
import './index.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Mall {
  props: IProps;
}

@connect(() => ({

}), () => ({

}))
class Mall extends Component {
  state = {
    webViewUrl: '',
    shareParam: {},
    webviewParam: {}
  }

  componentDidShow () { }

  UNSAFE_componentWillUnmount () { }

  componentDidHide () { }
  onShareAppMessage(options) {
    if (options.webViewUrl.indexOf('product') > -1 || options.webViewUrl.indexOf('activity') > -1 || options.webViewUrl.indexOf('dynamic') > -1) {
      let currentPath = `/pages/mall/index?${this.state.shareParam.link}`
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(this.state.shareParam.imgSrc)) {
        return {
          title: this.state.shareParam.title,
          path: currentPath,
        }
      } else {
        return {
          title: this.state.shareParam.title,
          path: currentPath,
          imageUrl: this.state.shareParam.imgSrc
        }
      }
    } else if (options.webViewUrl.indexOf('share') > -1 || options.webViewUrl.indexOf('invite') > -1) {
      console.log(this.state.shareParam)
      let sharePath = `/pages/mall/index?${this.state.shareParam.link}`
      if (this.state.shareParam.imgSrc && /\.(jpg|jpeg|png|JPG|PNG)$/.test(this.state.shareParam.imgSrc)) {
        return {
          title: this.state.shareParam.title,
          path: sharePath,
          imageUrl: this.state.shareParam.imgSrc
        }
      }
      return {
        title: this.state.shareParam.title,
        path: sharePath,
        // imageUrl: '../images/share.jpg'
      }
    } else {
      if (this.state.shareParam && this.state.shareParam.link) {
        return {
          title: '用畅行舌尖，发现好价玩赚生活',
          path: `/pages/mall/index?${this.state.shareParam.link}`,
          // imageUrl: '../images/share.jpg'
        }
      } else {
        return {
          title: '用畅行舌尖，发现好价玩赚生活',
          path: `/pages/mall/index`,
          // imageUrl: '../images/share.jpg'
        }
      }
    }
  }
  onLoad (query) {
    console.log(query, '------------------load')
    const Timestamp = new Date().getTime()
    if (query && query.scene) {
      // 扫描商品详情二维码进入的情况或者扫码直播间海报
      const scene = decodeURIComponent(query.scene)
      let paramsArr = scene.split('/')
      if (paramsArr[0] === 'R') {
        // 直播间海报
        let siteId = ''
        if(paramsArr.length === 7) {
          siteId = paramsArr[paramsArr.length - 3]
        }
        console.log(paramsArr)
        console.log(siteId)
        const roomId = paramsArr[1]
        // const customParams = `${paramsArr[2]}/${paramsArr[3]}A${siteId}`
        // 在这里进行埋点
        Taro.request({
          url: `${config.target}/mtourists-api/pddapi/user/userActionLog`,
          method: 'POST',
          data: {
            actionLinkId: roomId,
            shareId: paramsArr[3],
            orderCustId: paramsArr[2],
            actionCode: 'visit_zbj',
            actionType: 1,
            actionRemark: '扫描海报或分享链接进入直播间',
            actionName: '进入直播间事件'
          },
          header: {
            'X-Authorization': 'Bearer null'
          },
          success: res => {
            if (res.data && res.data.state === 1) {
              const logres = res.data.data
              this.globalData.openId = logres.openid
              this.globalData.unionid = logres.unionid
            }
          },
          fail: err => {
            console.log(err)
          }
        })
        // 埋点结束
        // Taro.redirectTo({
        //   url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${encodeURIComponent(customParams)}`
        // })
      } else if(paramsArr[0] === 'D') {
        this.state.webviewParam['environmental'] = paramsArr[paramsArr.length - 2]
        this.state.webviewParam['custId'] = paramsArr[2]
        this.state.webviewParam['shareId'] = paramsArr[3]
        this.state.webviewParam['page'] = `productdynamic/${paramsArr[1]}`
        this.state.webviewParam['siteId'] = 6
      } else if(paramsArr[0] === 'H') {
       
        this.state.webviewParam['environmental'] = paramsArr[paramsArr.length - 2]
        this.state.webviewParam['custId'] = paramsArr[2]
        this.state.webviewParam['shareId'] = paramsArr[3]
        this.state.webviewParam['page'] = `home`
        this.state.webviewParam['siteId'] = 6
      }
       else {
        if (paramsArr[paramsArr.length - 1] === 'p') {
          // 商品详情页
          this.state.webviewParam['page'] = pages[paramsArr[paramsArr.length - 1]]
          this.state.webviewParam['environmental'] = paramsArr[paramsArr.length - 2]
          this.state.webviewParam['infoId'] = paramsArr[0]
          this.state.webviewParam['custId'] = paramsArr[1]
          this.state.webviewParam['shareId'] = paramsArr[2]
          if (paramsArr[4] === 'U') {
            this.state.webviewParam['union'] = paramsArr[4]
            this.state.webviewParam['page'] = pages['u']
          }
          if (paramsArr[3] !== 't') {
            this.state.webviewParam['siteId'] = 6
          }
          setTimeout(()=>{
            console.log(this.state.webviewParam,'++++++++++')
          },1000)
        }
      }
    }
    // 处理跳转逻辑
    if (query.infoId || query.activityId || query.page || query.siteId || query.room_id) {
      this.state.webviewParam = JSON.parse(JSON.stringify(query))
    }

    // 上面一直是处理app.globalData.webviewParam的方法
    let currentUrl = ''
    
    if (this.state.webviewParam && this.state.webviewParam.infoId) {
      let infoId = this.state.webviewParam.infoId
      let baseUrl = config[this.state.webviewParam.environmental]
      let urlParams = util.formatParam(this.state.webviewParam)
      let routePage = this.state.webviewParam.page
      let currentUrl = `${baseUrl}${routePage}/${infoId}?v=${Timestamp}&siteId=6&${urlParams}`
      this.setState({
        webViewUrl: currentUrl
      }, () => {
        console.log(this.state.webViewUrl)
      })
    } else if (this.state.webviewParam && this.state.webviewParam.activityId) {
      const activityId = this.state.webviewParam.activityId
      let baseUrl = config[this.state.webviewParam.environmental]
      let urlParams = util.formatParam(this.state.webviewParam)
      let routePage = this.state.webviewParam.page
      let currentUrl = `${baseUrl}${routePage}/${activityId}?v=${Timestamp}&siteId=6&${urlParams}`
      this.setState({
        webViewUrl: currentUrl
      }, () => {
        console.log(this.state.webViewUrl)
      })
    } else if (this.state.webviewParam && this.state.webviewParam.page === 'invite') {
      let baseUrl = config[this.state.webviewParam.environmental]
      let urlParams = util.formatParam(this.state.webviewParam)
      let routePage = this.state.webviewParam.page
      let currentUrl = `${baseUrl}${routePage}?v=${Timestamp}&siteId=6&${urlParams}`
      this.setState({
        webViewUrl: currentUrl
      }, () => {
        console.log(this.state.webViewUrl)
      })
    } else if (this.state.webviewParam && this.state.webviewParam.page === 'talent') {
      let baseUrl = config[this.state.webviewParam.environmental]
      let urlParams = util.formatParam(this.state.webviewParam)
      let routePage = this.state.webviewParam.page
      let currentUrl = `${baseUrl}${routePage}?v=${Timestamp}&siteId=6&${urlParams}`
      this.setState({
        webViewUrl: currentUrl
      }, () => {
        console.log(this.state.webViewUrl)
      })
    }
    else if (this.state.webviewParam && this.state.webviewParam.page === 'index') {
      const webviewlink = config[config.environmental]
      let urlParams = util.formatParam(this.state.webviewParam)
      this.setState({
        webViewUrl: `${webviewlink}home?v=${Timestamp}&${urlParams}`
      })
      console.log(this.state.webViewUrl)
    } else if (this.state.webviewParam && this.state.webviewParam.page) {
      let baseUrl = config[this.state.webviewParam.environmental]
      let urlParams = util.formatParam(this.state.webviewParam)
      let routePage = this.state.webviewParam.page
      let currentUrl = `${baseUrl}${routePage}?v=${Timestamp}&siteId=6&${urlParams}`
      this.setState({
        webViewUrl: currentUrl
      }, () => {
        console.log(this.state.webViewUrl)
      })
    }
    else {
      const webviewlink = config[config.environmental]
      console.log(webviewlink)
      let urlParams = util.formatParam(this.state.webviewParam)
      console.log(Timestamp)
      this.setState({
        webViewUrl: `${webviewlink}home?v=${Timestamp}&siteId=6&${urlParams}`
      })
    }
    setTimeout(()=>{
      console.log(this.state.webViewUrl,'----------------------')
    })
  }
  getMessage= (e)=> {
    if (e.detail.data) {
      this.state.shareParam = e.detail.data[e.detail.data.length - 1]
    }
  }
  bindload(e) {
    console.log(e)
  }
  binderror(e) {
    console.log(e)
  }
  render () {
    return (
      <WebView onMessage="getMessage" src={this.state.webViewUrl} onError="binderror" onLoad="bindload" />
    )
  }
}

export default Mall

