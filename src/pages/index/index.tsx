import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, Button, Text, Swiper, SwiperItem } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import { add, minus, asyncAdd } from '../../store/actions'
import './index.scss'
import API from '@/api/index'

import icon_xsqg from '@/static/img/index/icon_xsqg.png'
import icon_thsc from '@/static/img/index/icon_thsc.png'
import icon_cccx from '@/static/img/index/icon_cccx.png'
import icon_czdp from '@/static/img/index/icon_czdp.png'
import jhkk from '@/static/img/index/jhkk.png'
import mfsc from '@/static/img/index/mfsc.png'
import scroll from '@/static/img/index/scroll.png'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

const buttonList = [
  {
    img: icon_xsqg,
    name: '限时抢购',
    url: ''
  },
  {
    img: icon_thsc,
    name: '特惠商城',
    url: ''
  },
  {
    img: icon_cccx,
    name: '时刻查询',
    url: ''
  },
  {
    img: icon_czdp,
    name: '车站大屏',
    url: ''
  }
]

const scrollList = [
  {
    img: scroll,
    url: ''
  },
  {
    img: scroll,
    url: ''
  }
]

const recommendList = [
  {
    img: jhkk,
    city: '广州',
    title: '【广州海珠】暑假转场想休息休息想休息休息',
    price: '39.9'
  },
  {
    img: jhkk,
    city: '广州',
    title: '【广州海珠】暑假转场想休息休息想休息休息',
    price: '39.9'
  }
]

const goodsList = [
  {
    img: jhkk,
    name: '广式腊味煲仔饭',
    price: '15',
    prePrice: '50'
  },
  {
    img: jhkk,
    name: '广式腊味煲仔饭',
    price: '15',
    prePrice: '50'
  }
]

const cityList = ['上海', '武汉', '长沙']
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  
}))


class Index extends Component {
  
  state = {
    buttonList,
    scrollList,
    positionCity: '', // 用户定位
    isSetting: false, // 用户设置
    lat: '',
    lon: '',
    tabIndex: 1,
    recommendList,
    isGetLocation: false,
    hasDistance: true,
    goodsList,
    cityList
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  UNSAFE_componentWillMount() {
    this.getLocation()
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getLocation()
   }

  componentDidHide () { }

  onReachBottom() {
    let recommendList = this.state.recommendList
    recommendList.push(...recommendList)
    this.setState({
      recommendList
    })
  }

  render () {
    const { cityList, buttonList, scrollList, positionCity, lat, tabIndex, recommendList, hasDistance, goodsList } = this.state
    return (
      <View className='home-page'>
        <View className='top-sec'>
          {
            hasDistance && <View className='ticket'>
              <View className='top-msg'>
                <Text className='date'>8月18日 周二</Text>
                <Text className='tip-text'>到达口:C1</Text>
              </View>
              <View className='bottom-msg'>
                <View className='left-msg'>
                  <Text className='name'>武昌</Text>
                  <Text className='time'>03: 15</Text>
                </View>
                <View className='center-msg'>
                  <Text className='train'>K155</Text>
                  <Text className='icon'></Text>
                  <Text className='long-time'>全程5小时20分钟</Text>
                </View>
                <View className='right-msg'>
                  <Text className='name'>广州</Text>
                  <Text className='time'>08: 35</Text>
                </View>
                
              </View>
              <Text className='bottom-space'></Text>
            </View>
          }
          {
            !hasDistance && <Image src="" mode="aspectFill" className='topImg'></Image>
          }
        </View>
        {/*------按钮------*/}
        {!hasDistance && <View className='inter-list'>
          {
            buttonList.map((item, i) => {
              return (
                <View className='inter-item' key={'icon'+i}>
                  <Image src={item.img} className='icon' mode="aspectFill"></Image>
                  <Text className='name'>{item.name}</Text>
                </View>
              )
            })
          }
          
        </View>}
        {/*------免费试吃/开卡------*/}
        <View className='sec-middle'>
          <View className='foretaste'>
            <Text className='text'>车厢食品免费试吃</Text>
            <Image src={mfsc} className='taste-img' mode="aspectFill" ></Image>
          </View>
          <View className='open-card'>
            <Text className='text'>建行信用卡开卡送现金</Text>
            <Image src={jhkk} className='card-img' mode="aspectFill" ></Image>
          </View>
        </View>
        {/*------轮播------*/}
        <Swiper 
          className='scroll-box'
          autoplay
          >
          {
            scrollList.map((item, index) => {
              return (
                <SwiperItem key={'swiper'+index}>
                  <Image src={item.img} className='scroll-img' mode="aspectFill" ></Image>
                </SwiperItem>  
              )
            })
          }
        </Swiper> 
        {/*------乘务美食------*/}
        {hasDistance && <View className='crew-food'>
          <View className='title'>
            <Text className='name'>G400乘务员美食推荐</Text>
            <View className='icon'>更多</View>
          </View>
          <View className='goods-box'>
            {
              goodsList.map((item, index) => {
                return (
                  <View className='goods-item' key={'goods'+index}>
                    <Image src={item.img} className='goods-img' mode="aspectFill"></Image>
                    <Text className='goods-title'>{item.name}</Text>
                    <View className='goods-msg'>
                      <Text className='price'>¥{item.price}</Text>
                      <Text className='pre-price'>¥{item.prePrice}</Text>
                      <Text className='buy-btn'>立即抢购</Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>}

        {/*------途径城市-------*/}
        {hasDistance && <View className='road-city'>
          <View className='name'>途经城市好物推荐</View>
          <View className='city-list'>
            {
              cityList.map((item, index) => {
                return <Text className={`city ${index === 1 && 'active'}`} key={'city'+index}>{item}</Text>
              })
            }
          </View>
        </View>}


        {/*------定位------*/}
        <View className='fixed-position'>
          <Text>{lat ? '当前定位' + {positionCity} : '定位服务已关闭，打开定位'}</Text>
          {!lat && <Button openType="openSetting" className="setting">去设置</Button>}
        </View>
        
        {/*------tab切换------*/}
        <View className="tab-list">
          <View className={`tab-item ${tabIndex === 1 && 'active'}`} onClick={() => this.changeTab(1)}>特产推荐</View>
          <View className={`tab-item ${tabIndex === 2 && 'active'}`} onClick={() => this.changeTab(2)}>旅游推荐</View>
        </View>

        <View className='recommend-list'>
          {
            recommendList.map((item, index) => {
              return (
                <View className='recommend-item' key={'re'+index}>
                  <Image src={item.img} className='recommend-img' mode="aspectFill" ></Image>
                  <Text className='recommend-title'>{item.title}</Text>
                  <View className='recommend-msg'>
                    <Text className='city'>{item.city}</Text>
                    <View className='right-msg'>
                      <Text className='unit'>¥</Text>
                      <Text className='price'>{item.price}</Text>
                      <Text className='unit'>起</Text>
                      <Text className='buy-btn'>立即抢购</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
  // 获取位置信息
  getLocation = () => {
    if (this.state.isGetLocation) return
    let _this = this
    this.setState({
      isGetLocation: true
    })
    Taro.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
          Taro.authorize({
            scope: 'scope.userLocation',
            success (res) {
              // 用户同意打开地理位置
              Taro.getLocation({
                success: res => {
                  console.log(res)
                }
              })
            },
            fail() {
              _this.setState({
                isSetting: false
              })
            },
            complete() {
              _this.setState({
                isGetLocation: false
              })
            }

          })
        } else {
          Taro.getLocation({
            success: res => {
              this.setState({
                lat: res.latitude,
                lon: res.longitude
              })
              // 通过坐标值获取城市
            },
            complete() {
              _this.setState({
                isGetLocation: false
              })
            }
          })
        }
      }
    })
  }

  getListData = () => {
    API.Global.getListData({a: 1})
    .then(res => {
      console.log(res)
    })
    .finally(() => {
      
    })
  }

  changeTab = (index) => {
    this.setState({
      tabIndex: index
    })
  }

  openSetting = () => {
    Taro.openSetting({
      success: res => {
        Taro.getLocation({
          success: res => {
            console.log(res)
          }
        })
      }
    })
  }
}

export default Index

