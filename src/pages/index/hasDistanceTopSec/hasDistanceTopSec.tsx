import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import './hasDistanceTopSec.scss'

import zyIcon from '@/static/img/index/icon_zy.png'
import zyActiveIcon from '@/static/img/index/icon_zy-active.png'
import czdpIcon from '@/static/img/index/icon_czdp.png'
import skcxIcon from '@/static/img/index/icon_skcx.png'
import lxscIcon from '@/static/img/index/icon_lxsc.png'
import jrsxIcon from '@/static/img/index/icon_jrsx.png'
import default1 from '@/static/img/index/default-1.png'
import default2 from '@/static/img/index/default-2.png'
import default3 from '@/static/img/index/default-3.png'
import beijing from '@/static/img/cityIcon/beijing.png'
import changsha from '@/static/img/cityIcon/changsha.png'
import guangzhou from '@/static/img/cityIcon/guangzhou.png'
import guiyang from '@/static/img/cityIcon/guiyang.png'
import hangzhou from '@/static/img/cityIcon/hangzhou.png'
import kunming from '@/static/img/cityIcon/kunming.png'
import shanghai from '@/static/img/cityIcon/shanghai.png'
import shenzhen from '@/static/img/cityIcon/shenzhen.png'
import wuhan from '@/static/img/cityIcon/wuhan.png'
import xiamen from '@/static/img/cityIcon/xiamen.png'
import xian from '@/static/img/cityIcon/xian.png'
import zhengzhou from '@/static/img/cityIcon/zhengzhou.png'

type PageStateProps = {
  trainInfo: any,
  positionCity: string,
  middleAd: Array<any>
}
type PageDispatchProps = {
  setTab: (any) => any
}

type PageOwnProps = {

}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface HasDistanceTopSec {
  props: IProps;
}

const fixedButton = [
  {
    img: czdpIcon,
    name: '车站大屏',
    url: '/pages/switchStation/index'
  },
  {
    img: skcxIcon,
    name: '时刻查询',
    url: '/pages/add/index'
  },
  {
    img: lxscIcon,
    name: '旅行商城',
    url: '/tab/pages/mall/index'
  },
  {
    img: jrsxIcon,
    name: '今日上新',
    url: '/mall/pages/mall/index'
  }
]

const defualtRecommend = [
  {img: default1, url: '', name: '广州必玩景点榜'},
  {img: default2, url: '', name: '广州美食必吃榜'},
  {img: default3, url: '', name: '广州热门必逛榜'}
]

const cityList = [
  {name: '上海', img: shanghai},
  {name: '上海', img: shanghai},
  {name: '南京', img: ''},
  {name: '武汉', img: wuhan},
  {name: '长沙', img: changsha},
  {name: '韶关', img: ''},
  {name: '深圳', img: shenzhen},
  {name: '广州', img: guangzhou},
  {name: '广州', img: guangzhou}
]

@connect(({counter}) => ({
  ...counter
}), () => ({

}))

class HasDistanceTopSec extends Component {
  state = {
    showBoll: false,
    week: ['周日','周一','周二','周三','周四','周五','周六'],
    hasRecommend: false,
    cityIndex: 3,
    areaId: 1
  }

  onLoad() {

  }

  UNSAFE_componentWillMount() {}

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }

  render() {
    const { showBoll, week, hasRecommend, cityIndex } = this.state
    const { trainInfo, middleAd } = this.props
    return (
      <View className="has-distance">
        <View className="top-content">
          {/*-----悬浮按钮-------*/}
          <View className="fixed-boll">
            {showBoll || <Image src={zyIcon} className="main-boll" onClick={this.clickBoll}></Image>}
            {showBoll && <Text className={`main-boll ${showBoll && 'active'}`} onClick={this.clickBoll}>收起</Text>}
            <View className={`boll-menu-bg ${showBoll ? 'active' : ''}`}></View>
            {
              fixedButton.map((item, index) => {
                return (
                  <View className={`boll-item boll-item${index+1} ${showBoll ? 'active' : ''}`} key={'boll'+index} onClick={() => {this.toPage(item)}}>
                    <Image src={item.img} className="boll-img" mode="aspectFill"></Image>
                    <Text className="boll-text">{item.name}</Text>
                  </View>
                )
              })
            }
          </View>
          {/*------车票信息------*/}
          <View className='ticket'>
            <View className='top-msg'>
              <Text className='date'>{dayjs().format('MM月DD日')} {week[dayjs().day()]}</Text>
              {/* <Text className="customer-name">小小</Text> */}
              {/* <Text className='tip-text'>到达口:C1</Text> */}
            </View>
            <View className='bottom-msg'>
              <View className='left-msg'>
                <Text className='name'>{trainInfo.startStation}</Text>
                <Text className='time'>{trainInfo.startTime}</Text>
              </View>
              <View className='center-msg'>
                <Text className='train'>{trainInfo.train}</Text>
                <Text className='icon'></Text>
                <Text className='long-time'>{trainInfo.duration}</Text>
              </View>
              <View className='right-msg'>
                <Text className='name'>{trainInfo.endStation}</Text>
                <Text className='time'>{trainInfo.endTime}</Text>
              </View>
            </View>
            {trainInfo.seat && <View className="foot-msg">
              <View className="foot-left">
                <Text className='small-text'>席别</Text>
                <Text className='big-text'>{trainInfo.seat}</Text>
              </View>
              <View className="foot-right">
                <Text className='small-text'>座位号</Text>
                <Text className='big-text'>{trainInfo.seat}</Text>
              </View>
            </View>}
            <Text className='bottom-space'></Text>
          </View>

          {/*------途径城市-------*/}
          {cityList.length > 0 && <View className='road-city'>
            {/*<View className='name'>途经城市好物推荐</View>*/}
          <Text className='city-context'>{cityList[cityIndex].cityContext ? cityList[cityIndex].cityContext : '当前'}</Text>
            <View className="city begin-city">
              <View className="city-icon"></View>
              <Text className="city-name">{cityList[0].name}</Text>
            </View>
            <View className="city-scroll-box">
              <View className='city-list' style={{width: 140 * cityList.length+'rpx', transform: `translateX(-${(cityIndex - 1) * 140 - 20}rpx)`}}>
                {
                  cityList.map((item, index) => {
                    return (
                      <View className={`city ${index === cityIndex && 'active'}`} key={'city'+index} onClick={() => {this.selectCity(item, index)}}>
                        <View className={`city-icon ${!item.img && index === cityIndex && 'background'}`}>
                          {(index === cityIndex || index === 0) && <View className="city-line-left"></View>}
                          {item.info && index !== cityIndex &&  <Text className="train-info">{item.info}</Text>}
                          {index === cityIndex && item.img && <Image src={item.img} className="city-img" mode="aspectFit"></Image>}
                          {index !== cityIndex - 1 && <View className="city-line-right"></View>}
                        </View>
                        <Text className={`city-name ${(index === 0 || index === cityList.length - 1) && 'transparent'}`}>{item.name}</Text>

                      </View>
                    )
                  })
                }
              </View>
            </View>

            <View className="city end-city">
              <View className="city-icon"></View>
              <Text className="city-name">{cityList[cityList.length-1].name}</Text>
            </View>
          </View>}

          <View className="white-bg"></View>

          {/*------当前城市有推荐商品-----*/}
          {middleAd.length > 0 && <View className="city-recommend">
            {
              middleAd.map((item, index) => {
                return (
                  <View className="recommend-item" key={'reco'+index} onClick={() => {this.clickRecommend(item, index)}}>
                    <Image src={item.imageUrl} className="recommend-img" mode="aspectFill"></Image>
                    <Text className="recommend-text">{item.imageDesc}</Text>
                  </View>
                )
              })
            }
          </View>}
        </View>

      </View>
    )
  }

  // 悬浮球被点击
  clickBoll = () => {
    this.setState({
      showBoll: !this.state.showBoll
    })
  }

  // 跳转页面
  toPage = (page) => {
    // 跳小程序页面和h5页面
    // if (page.url.includes('/info')) {
    //   Taro.setStorageSync('hotRecommend', 1)
    //   Taro.switchTab({
    //     url: page.url.replace('/info', '')
    //   })
    // }
    if (page.url.includes('/tab')) {
      Taro.setStorageSync('preference', 1)
      Taro.switchTab({
        url: page.url.replace('/tab', '')
      })
    } else if (page.url.includes('/pages')) {
      Taro.navigateTo({
        url: page.url
      })
    } else if (page.url.includes('/mall')) {
      Taro.setStorageSync('today', 1)
      Taro.navigateTo({
        url: page.url.replace('/mall', '')
      })
    }
    // else if (page.url) {
    //   Taro.navigateTo({
    //     url: `/pages/adPage/index?url=${page.url}`
    //   })
    // }
  }

  // 广告页跳转
  toAdPage = (ad) => {
    ad && Taro.navigateTo({
      url: `/pages/adPage/index?url=${ad}`
    })
  }

  // 选择城市
  selectCity(city, index) {
    if (index === 0 || index === cityList.length - 1) return
    this.setState({
      // positionCity: city.cityName,
      areaId: city.zwyCityId,
      cityIndex: index
    }, () => {
      // this.getListData(this.state.tabIndex)
      // this.props.setTab(123)
    })
  }

  clickRecommend = (item, index) => {
    if (index === 0) {
      let city = this.props.positionCity
      if (+item.type === 1) {
        city = '广州'
      }
      Taro.navigateTo({
        url: `${item.toUrl}&city=${city}`
      })
    } else {
      console.log(item)
    }
  }

}

export default HasDistanceTopSec
