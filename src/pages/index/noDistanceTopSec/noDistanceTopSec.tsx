import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Image, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import API from '@/api'

import './noDistanceTopSec.scss'

import addIcon from '@/static/img/index/icon_tianjia.png'
import rightIcon from '@/static/img/index/you.png'
import czdp from '@/static/img/index/icon_czdp-2.png'
import skcx from '@/static/img/index/icon_skcx-2.png'
import lxsc from '@/static/img/index/icon_lxsc-2.png'
import jrsx from '@/static/img/index/icon_jrsx-2.png'
import default1 from '@/static/img/index/default-1.png'
import default2 from '@/static/img/index/default-2.png'
import default3 from '@/static/img/index/default-3.png'

type PageStateProps = {
  positionCity: string,
  setLocationCity: any
}
type PageDispatchProps = {

}

type PageOwnProps = {

}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface NoDistanceTopSec {
  props: IProps;
}

const BUTTON_LIST = [
  {
    img: czdp,
    name: '车站大屏',
    url: '/pages/switchStation/index'
  },
  {
    img: skcx,
    name: '时刻查询',
    url: '/pages/add/index'
  },
  {
    img: lxsc,
    name: '旅行商城',
    url: ''
  },
  {
    img: jrsx,
    name: '今日上新',
    url: ''
  }
]

const defualtRecommend = [
  {img: default1, url: '', name: '广州必玩景点榜'},
  {img: default2, url: '', name: '广州美食必吃榜'},
  {img: default3, url: '', name: '广州热门必逛榜'}
]

@connect(({counter}) => ({
  ...counter
}), () => ({

}))

class NoDistanceTopSec extends Component {
  state = {
    buttonList: BUTTON_LIST,
    hasRecommend: true
  }

  onLoad() {

  }

  UNSAFE_componentWillMount() {}

  componentWillUnmount () { }

  componentDidHide () { }

  render() {
    const { buttonList, hasRecommend } = this.state
    const { positionCity }  = this.props
    // const { } = this.props

    return (
      <View className="top-sec-content">
        <Text className="title">Hi，尊敬的会员</Text>
        <View className="distance-tip" onClick={this.toAddDistance}>
          <Image src={addIcon} className="add-icon" mode="aspectFill"></Image>
          <Text className="tip-text">添加行程，随时查看出行信息</Text>
          <Image src={rightIcon} className="right-icon" mode="aspectFill"></Image>
        </View>

        {/*------按钮------*/}
        <View className='inter-list'>
          {
            buttonList.map((item, i) => {
              return (
                <View className='inter-item' key={'icon'+i} onClick={() => {this.toPage(item)}}>
                  <Image src={item.img} className='icon' mode="aspectFill"></Image>
                  <Text className='name'>{item.name}</Text>
                </View>
              )
            })
          }
        </View>

        {/*------定位------*/}
        <View className={`fixed-position ${positionCity && 'active'} ${hasRecommend && 'has-recommend'}`}>
          <Text>{positionCity ? '当前定位: ' + positionCity : '当前未获取定位权限，请在'}</Text>
          {!!positionCity || <Button openType="openSetting" className="setting">设置</Button>}
          {!!positionCity || <Text>中打开</Text>}
        </View>

        {/*------当前城市有推荐商品-----*/}
        {hasRecommend && <View className="city-recommend">
          {
            defualtRecommend.map((item, index) => {
              return (
                <View className="recommend-item" key={'reco'+index}>
                  <Image src={item.img} className="recommend-img" mode="aspectFill" onClick={() => {this.toAdPage(item.url)}} key={'img'+index}></Image>
                  <Text className="recommend-text">{item.name}</Text>
                </View>
              )
            })
          }
        </View>}


      </View>
    )
  }

  toAddDistance = () => {
    Taro.navigateTo({
      url: '/pages/add/index'
    })
  }


  // 跳转页面
  toPage = (page) => {
    // 跳小程序页面和h5页面
    if (page.url.includes('/info')) {
      Taro.setStorageSync('hotRecommend', 1)
      Taro.switchTab({
        url: page.url.replace('/info', '')
      })
    } else if (page.url.includes('/tab')) {
      Taro.setStorageSync('preference', 1)
      Taro.switchTab({
        url: page.url.replace('/tab', '')
      })
    } else if (page.url.includes('/pages')) {
      Taro.navigateTo({
        url: page.url
      })
    } else if (page.url) {
      Taro.navigateTo({
        url: `/pages/adPage/index?url=${page.url}`
      })
    }
  }

  // 广告页跳转
  toAdPage = (ad) => {
    ad && Taro.navigateTo({
      url: `/pages/adPage/index?url=${ad}`
    })
  }
}

export default NoDistanceTopSec
