import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, Button, Text, Swiper, SwiperItem, Block, Navigator } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { setTrainInfo, setTotalPrice, addGoods } from '@/store/actions'
// import dayjs from 'dayjs'
import API from '@/api'
import './index.scss'


import topBg from '@/static/img/index/pic_beijing.png'
import default1 from '@/static/img/index/default-1.png'
import default2 from '@/static/img/index/default-2.png'
import default3 from '@/static/img/index/default-3.png'
// import scroll from '@/static/img/index/scroll.png'

import NoDistanceTopSec from './NoDistanceTopSec/NoDistanceTopSec'
import HasDistanceTopSec from './HasDistanceTopSec/HasDistanceTopSec'

type PageStateProps = {
  date: string,
  trainInfo: any,
  userStationInfo: any
}
type PageDispatchProps = {
  setTrainInfo: (any) => any
  setTotalPrice: (any) => any
  addGoods: (any) => any
}

type PageOwnProps = {}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

const defualtRecommend = [
  {img: default1, url: '', name: '广州必玩景点榜'},
  {img: default2, url: '', name: '广州美食必吃榜'},
  {img: default3, url: '', name: '广州热门必逛榜'}
]

const tabList = ['旅游爆款', '高铁优选', '当地美食', '亲子热门']

@connect(({ counter }) => ({
  ...counter
}), (dispatch) => ({
  setTrainInfo: (payload) => {
    dispatch(setTrainInfo(payload))
  },
  setTotalPrice: (payload) => {
    dispatch(setTotalPrice(payload))
  },
  addGoods: (payload) => {
    dispatch(addGoods(payload))
  }

}))


class Index extends Component {

  state = {
    goodsList: [],
    cityList: [],
    cityIndex: 0,
    recommendList: [],
    positionCity: '', // 用户定位
    areaId: '',
    // isSetting: false, // 用户设置
    lat: '',
    lon: '',
    startIndex: 0,
    tabIndex: 1,
    themeId: '',
    excludeThemeId: '101098',
    isGetLocation: false,
    hasDistance: true,
    hideModal: false,
    topAd: [1],
    middleAd: [],
    noMoreData: false,
    code: '',
    noRecommend: true
  }

  onLoad() {
    // app.tdweapp.td_app_sdk.event()
    // Taro.showShareMenu({
    //   withShareTicket: true
    // })
    // this.getAdData()
    // this.state.areaId && this.getListData(this.state.tabIndex)
  }

  UNSAFE_componentWillMount() {}

  componentWillUnmount () { }

  componentDidShow () {
    // console.log(TD, 111)
    // TD.Page.load(true)
    // 扶手码code
    let router: any = getCurrentInstance().router
    let code = router.params.code
    code && this.setState({code}, () => {
      this.getTrain()
    })
    !this.state.areaId && this.getLocation()
  }

  componentDidHide () { }

  onReachBottom() {
    if (this.state.noMoreData) return
    this.setState({
      startIndex: this.state.startIndex + 5
    })
    this.getListData(this.state.tabIndex)
  }

  render () {
    const { cityList, cityIndex, hideModal, positionCity, tabIndex, recommendList, hasDistance, goodsList, topAd, middleAd, noRecommend } = this.state
    const { trainInfo } = this.props
    return (
      <View className='home-page'>
        {/*<Image src={topBg} className="top-bg"></Image>*/}
        <Swiper
          className='top-scroll-box'
          vertical={false}
        >
          {
            topAd.map((item, index) => {
              return (
                <SwiperItem key={'scr'+index}>
                  <Image src={topBg} className='scroll-img' mode="aspectFill" onClick={() => {this.toAdPage(item)}}></Image>
                </SwiperItem>
              )
            })
          }
        </Swiper>

        <View className="page-content">
          {/*----顶部部分-----*/}
          <View className="top-sec">
            {hasDistance || <NoDistanceTopSec positionCity={positionCity} setPosition={this.setLocationCity}></NoDistanceTopSec>}
            {hasDistance && <HasDistanceTopSec setTab={this.setTab}></HasDistanceTopSec>}
          </View>

          {/*------当前城市无推荐商品-----*/}
          {noRecommend && <View className="city-recommend">
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

          {/*------免费试吃/开卡------*/}
          {/*<View className='sec-middle'>
            <View className='foretaste' onClick={() => {this.toMall({infoId: 28011235})}}>
              <Text className='text'>今日新品发布</Text>
              <Image src={xpfb} className='taste-img' mode="aspectFill" />
            </View>

            <View className='open-card' hoverClass="" onClick={() => {this.toMall({infoId: 28196375})}}>
              <Text className='text'>扶贫助农产品</Text>
              <Image src={fpzn} className='card-img' mode="aspectFill" />
            </View>
          </View>*/}


          {/*------轮播------*/}
          {/*<Swiper
            className='scroll-box'
            vertical={false}
          >
            {
              middleAd.map((item, index) => {
                return (
                  <SwiperItem key={'scr'+index}>
                    <Image src={item.imageUrl} className='scroll-img' mode="aspectFill" onClick={() => {this.toAdPage(item)}}></Image>
                  </SwiperItem>
                )
              })
            }
          </Swiper>*/}

          {/*------乘务美食------*/}
          {hideModal && <View className='crew-food'>
            {goodsList.length > 0 && <View className='title'>
              <Text className='name'>{trainInfo.train}乘务员美食推荐</Text>
              <View className='icon' onClick={this.toCarFood}>更多</View>
            </View>}
            <View className='goods-box'>
              {
                goodsList.map((item, index) => {
                  return (
                    <View className='goods-item' key={'goo'+index} onClick={this.toCarFood}>
                      <Image src={item.thumbImg} className='goods-img' mode="aspectFill"></Image>
                      <Text className='goods-title'>{item.productName}</Text>
                      <View className='goods-msg'>
                        <Text className='price'>¥{(item.price/100).toFixed(2)}</Text>
                        {/*<Text className='pre-price'>¥{item.prePrice}</Text>*/}
                        <Text className='buy-btn'>立即抢购</Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>}

          {/*------途径城市-------*/}
          {/*{hasDistance && <View className='road-city'>*/}
          {/*  <View className='name'>途经城市好物推荐</View>*/}
          {/*  <View className='city-list'>*/}
          {/*    {*/}
          {/*      cityList.map((item, index) => {*/}
          {/*        return <Text className={`city ${index === cityIndex && 'active'}`} key={'city'+index} onClick={() => {this.selectCity(item, index)}}>{item.cityName}</Text>*/}
          {/*      })*/}
          {/*    }*/}
          {/*  </View>*/}
          {/*</View>}*/}

          {/*------城市好物推荐------*/}
          <View className="good-recommend">
            <Text className="recommend-title">城市好物推荐</Text>

            {/*------tab切换------*/}
            <View className="tab-list">
              {
                tabList.map((item, index) => {
                  return <View className={`tab-item ${+tabIndex === index+1 && 'active'}`} onClick={() => this.changeTab(index+1)} key={'tab'+index}>{item}</View>
                })
              }
            </View>

            <View className='recommend-list'>
              {
                recommendList.map((item, index) => {
                  return (
                    <View className='recommend-item' key={'re'+index} onClick={() => {this.toMall(item)}}>
                      <Image src={item.signImg} className='recommend-img' mode="aspectFill"></Image>
                      <Text className='recommend-title'>{item.infoTitle}</Text>
                      <View className='recommend-msg'>
                        <Text className='city'>{item.city}</Text>
                        <View className='right-msg'>
                          <Text className='unit'>¥</Text>
                          <Text className='price'>{item.salePrice}</Text>
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
        </View>
      </View>
    )
  }

  showTip = () => {
    Taro.showToast({
      title: '敬请期待',
      icon: 'none'
    })
  }

  // 获取车次信息
  getTrain = () => {
    API.Home.getTrain({qrcode: this.state.code})
      .then(res => {
        res.data && this.props.setTrainInfo(res.data)
        // this.setState({
        //   hasDistance: !!res.data
        // })
        // res.data && this.getCityList(res.data.train)
        res.data && this.getCarFood(res.data)
      })
  }

  setTab = (num) => {
    console.log(num)
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
            success () {
              // 用户同意打开地理位置
              Taro.getLocation({
                success: val => {
                  _this.setState({
                    lat: val.latitude,
                    lon: val.longitude
                  }, () => {
                    _this.getLocationCity()
                  })
                }
              })
            },
            fail() {
              // _this.setState({
              //   isSetting: false
              // })
            },
            complete() {
              _this.setState({
                isGetLocation: false
              })
            }

          })
        } else {
          Taro.getLocation({
            success: response => {
              _this.setState({
                lat: response.latitude,
                lon: response.longitude
              }, () => {
                _this.getLocationCity()
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

  setLocationCity = (areaId) => {
    this.setState({
      areaId
    }, () => {
      this.getListData(this.state.tabIndex)
    })
  }

  // 获取当前城市的城市ID
  getLocationCity = () => {
    let data = {
      latitude: this.state.lat,
      longitude: this.state.lon
    }
    API.Home.getLocationCity(data)
      .then(res => {
        this.setState({
          positionCity: res.data.areaName,
          areaId: res.data.areaId + ''
        })
        this.getListData(this.state.tabIndex)
        // this.getCityList(this.props.trainInfo.train)
      })
  }

  // 请求推荐商品列表
  getListData = (index) => {
    if (this.state.noMoreData) return
    let loading = this.state.startIndex > 1
    let data = {
      resultNum: 5,
      startIndex: this.state.startIndex,
      areaId: this.state.areaId,
      themeId: this.state.themeId,
      excludeThemeId: this.state.excludeThemeId
    }
    API.Home.getListData(data, loading)
    .then(res => {
      let list = res.data && res.data.results || []
      // let recList = this.state.recommendList.concat(res.data && res.data.results)
      let recList: any[] = []
      if (this.state.startIndex > 1) {
        recList = [...this.state.recommendList, ...list]
      } else {
        recList = [...list]
      }

      if (this.state.tabIndex !== index) {
        recList = []
      }
      let length = res.data ? res.data.results.length : 0
      this.setState({
        noMoreData: length < 5,
        recommendList: recList
      })
    })
  }

  // 广告页跳转
  toAdPage = (ad) => {
    if (+ad.linkType === 1 && ad.toUrl) {
      ad.toUrl && Taro.navigateTo({
        url: `/pages/adPage/index?url=${ad.toUrl}`
      })
    }
  }

  // 切换商品推荐列表
  changeTab = (index) => {
    this.setState({
      tabIndex: index,
      themeId: index === 2 ? '101098' : '',
      excludeThemeId: index === 1 ? '101098' : '',
      // recommendList: [],
      startIndex: 0,
      noMoreData: false
    })
    this.getListData(index)
  }

  // 城市列表
  getCityList = (train) => {
    API.Home.getCityList({train})
      .then(res => {
        let id = this.state.areaId
        let index: number = res.data.findIndex(item => {
          return item.zwyCityId === id
        })
        index > -1 && this.setState({
          positionCity: res.data[index].cityName,
          cityList: res.data,
          cityIndex: index
        })
      })
  }

  // 选择城市
  selectCity(city, index) {
    this.setState({
      positionCity: city.cityName,
      areaId: city.zwyCityId,
      cityIndex: index
    }, () => {
      this.getListData(this.state.tabIndex)
    })
  }

  // 广告
  getAdData = () => {
    // 广告标识code定义
    // 首页顶部：home-head
    // 首页中部：home-middle
    // 下单支付成功页面：pay-success
    // 车厢美食：train-banner
    Promise.all([API.Home.getAdData({code: 'home-head'}), API.Home.getAdData({code: 'home-middle'})])
      .then(res => {
        this.setState({
          topAd: res[0].data ? res[0].data.bannerImgList : [],
          middleAd: res[1].data ? res[1].data.bannerImgList : []
        })
      })
  }

  // 车厢推荐商品列表
  getCarFood = (trainInfo) => {
    let data = {
      carriageRange: trainInfo.cid,
      train: trainInfo.train,
      trainDate: this.props.date
    }
    API.CarFood.getCarData(data)
      .then(res => {
        let cid = trainInfo.cid
        let products = (res.data && res.data[cid === 'A' ? 'frontTrainProducts' : 'backTrainProducts']) || []
        let arr = products.map(item => {
          return item.products
        })
        let goodsList: any = []
        arr.forEach(item => {
          item.forEach(goods => {
            goodsList.push(goods)
          })
        })
        this.setState({
          goodsList: goodsList.slice(0, 2)
        })
      })
  }

  // 跳转车厢美食推荐
  toCarFood = () => {
    Taro.navigateTo({
      url: '/pages/carFood/index'
    })
  }

  // 跳转到提交订单页
  toAccount = (item) => {
    let goods = [
      {
        productName: item.infoTitle,
        price: item.salePrice,
        number: 1,
        thumbImg: item.signImg
      }
    ]
    this.props.setTotalPrice(item.salePrice)
    this.props.addGoods(goods)
    // Taro.setStorageSync('goods', goods)
    let startStation = this.props.userStationInfo.startStation
    if(!startStation) {
      let train = this.props.trainInfo.train
      Taro.navigateTo({
        url: `/pages/orderSelectSite/index?trainNo=${train}`
      })
      return
    }
    Taro.navigateTo({
      url: '/pages/createOrder/index'
    })
  }

  // 跳转商城商品详情
  toMall = (item) => {
    let infoId = item.infoId
    infoId && Taro.setStorageSync('infoId', infoId)
    Taro.switchTab({
      url: `/pages/mall/index`
    })
  }
}

export default Index

