import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView, View } from '@tarojs/components'
import config from '../../utils/config'
import shareImg from '@/static/img/zowoyoo/share.jpg'
import Taro ,{getStorageSync} from '@tarojs/taro'

import './index.scss'
type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface User {
  props: IProps;
}

@connect(() => ({

}), () => ({

}))
class User extends Component {
  state = {
    webviewUrl: '',
    shareParam: {},
    webviewParam: {},
    params: 'siteId=6',
    isHome: true
  }
  componentWillUnmount () { }

  componentDidShow () {
    let account = Taro.getStorageSync('account')
    const webviewlink = config[config.environmental]
    let times = new Date().getTime()
    if(account) {
      this.setState({
        webviewUrl: `${webviewlink}account?time=${times}&siteId=6&from=application`
      })
    } else {
      this.setState({
        webviewUrl: `${webviewlink}user?time=${times}siteId=6`
      })
    }
    // Taro.removeStorageSync('account')
  }

  componentDidHide () {
    this.setState({
      webviewUrl: ''
    })
  }
  onMessage= (e)=> {
    if (e.detail.data) {
      this.state.shareParam = e.detail.data[e.detail.data.length - 1]
    }
  }
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
        imageUrl: shareImg
      }
    } else {
      if (this.state.shareParam && this.state.shareParam.link) {
        return {
          title: '畅行舌尖，让你享受火车出行新生活',
          path: `/pages/mall/index?${this.state.shareParam.link}`,
          imageUrl: shareImg
        }
      } else {
        return {
          title: '畅行舌尖，让你享受火车出行新生活',
          path: `/pages/mall/index`,
          imageUrl: shareImg
        }
      }
    }
  }
  render () {
    return (
      <WebView src={this.state.webviewUrl} onMessage={this.onMessage}/>
    )
  }
}

export default User

