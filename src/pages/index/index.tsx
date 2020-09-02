import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, Button, Text, Swiper, SwiperItem, Block, Navigator } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { setTrainInfo, setTotalPrice, addGoods } from '@/store/actions'
import dayjs from 'dayjs'
import API from '@/api'
import './index.scss'

import icon_xsqg from '@/static/img/index/icon_xsqg.png'
import icon_thsc from '@/static/img/index/icon_thsc.png'
import icon_cccx from '@/static/img/index/icon_cccx.png'
import icon_czdp from '@/static/img/index/icon_czdp.png'
import jhkk from '@/static/img/index/jhkk.png'
import mfsc from '@/static/img/index/mfsc.png'
import scroll from '@/static/img/index/scroll.png'

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

const BUTTON_LIST = [
  {
    img: icon_xsqg,
    name: '爆品抢购',
    url: '/info/pages/mall/index'
  },
  {
    img: icon_thsc,
    name: '特惠商城',
    url: '/tab/pages/mall/index'
  },
  {
    img: icon_cccx,
    name: '时刻查询',
    url: '/pages/add/index'
  },
  {
    img: icon_czdp,
    name: '车站大屏',
    url: '/pages/switchStation/index'
  }
]

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
    buttonList: BUTTON_LIST,
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
    themeId: '101098',
    excludeThemeId: '',
    isGetLocation: false,
    hasDistance: true,
    hideModal: true,
    topAd: [],
    middleAd: [],
    noMoreData: false,
    code: '',
    week: ['周日','周一','周二','周三','周四','周五','周六']
  }

  UNSAFE_componentWillMount() {
    // Taro.showShareMenu({
    //   withShareTicket: true
    // })
  }

  componentWillUnmount () { }

  componentDidShow () {
    // 扶手码code
    let router: any = getCurrentInstance().router
    let code = router.params.code || 9999
    code && this.setState({code}, () => {
      this.getTrain()
    })

    this.getAdData()
    !this.state.areaId && this.getLocation()
    this.state.areaId && this.getListData(this.state.tabIndex)

  }

  componentDidHide () { }

  // onShareAppMessage(options) {
  //   console.log(options, 11)
  // }


  onReachBottom() {
    if (this.state.noMoreData) return
    this.setState({
      startIndex: this.state.startIndex + 5
    })
    this.getListData(this.state.tabIndex)
  }

  render () {
    const { cityList, cityIndex, hideModal, buttonList, positionCity, lat, tabIndex, recommendList, hasDistance, goodsList, topAd, middleAd, week } = this.state
    const { trainInfo } = this.props
    return (
      <View className='home-page'>
        <View className='top-sec'>
          {/*{*/}
          {/*  hasDistance && <View className='ticket'>*/}
          {/*    <View className='top-msg'>*/}
          {/*      <Text className='date'>{dayjs().format('MM月DD日')} {week[dayjs().day()]}</Text>*/}
          {/*      /!*<Text className='tip-text'>到达口:C1</Text>*!/*/}
          {/*    </View>*/}
          {/*    <View className='bottom-msg'>*/}
          {/*      <View className='left-msg'>*/}
          {/*        <Text className='name'>{trainInfo.startStation}</Text>*/}
          {/*        <Text className='time'>{trainInfo.startTime}</Text>*/}
          {/*      </View>*/}
          {/*      <View className='center-msg'>*/}
          {/*        <Text className='train'>{trainInfo.train}</Text>*/}
          {/*        <Text className='icon'></Text>*/}
          {/*        <Text className='long-time'>{trainInfo.duration}</Text>*/}
          {/*      </View>*/}
          {/*      <View className='right-msg'>*/}
          {/*        <Text className='name'>{trainInfo.endStation}</Text>*/}
          {/*        <Text className='time'>{trainInfo.endTime}</Text>*/}
          {/*      </View>*/}

          {/*    </View>*/}
          {/*    <Text className='bottom-space'></Text>*/}
          {/*  </View>*/}
          {/*}*/}
          {
            hasDistance && topAd.map((item, index) => {
              return <Image src={item.imageUrl} mode="aspectFill" className='topImg' key={'img'+index} onClick={() => {this.toAdPage(item)}}></Image>
            })
          }
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
        {/*------免费试吃/开卡------*/}
        <View className='sec-middle'>
          <Navigator className='foretaste' url="/page/adPage/index?url=">
            <Text className='text'>车厢食品免费试吃</Text>
            <Image src={mfsc} className='taste-img' mode="aspectFill" />
          </Navigator>

          <Navigator className='open-card' url="/pages/adPage/index?url=https://cxsj-active-pre.eluchangxing.com/activate-card">
            <Text className='text'>建行信用卡开卡送现金</Text>
            <Image src={jhkk} className='card-img' mode="aspectFill" />
          </Navigator>

        </View>


        {/*------轮播------*/}
        <Swiper
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
        </Swiper>

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
        {/*<Swiper>*/}

        {/*  {*/}
        {/*    cityList.map((item, index) => {*/}
        {/*      return (*/}
        {/*        <Block key={'swiper'+index}>*/}
        {/*          <SwiperItem >*/}
        {/*            <Text className={`city ${index === 1 && 'active'}`}>{item}</Text>*/}
        {/*          </SwiperItem>*/}
        {/*        </Block>*/}
        {/*      )*/}
        {/*    })*/}
        {/*  }*/}
        {/*</Swiper>*/}
        {/*------定位------*/}
        <View className='fixed-position'>
          <Text>{positionCity ? '当前定位 ' + positionCity : '定位服务已关闭，打开定位'}</Text>
          {!lat && <Button openType="openSetting" className="setting">去设置</Button>}
        </View>

        {/*------tab切换------*/}
        <View className="tab-list">
          <View className={`tab-item ${+tabIndex === 1 && 'active'}`} onClick={() => this.changeTab(1)} key={1}>特产推荐</View>
          <View className={`tab-item ${+tabIndex === 2 && 'active'}`} onClick={() => this.changeTab(2)} key={2}>旅游推荐</View>
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
        {/*<Button openType='getUserInfo' onGetUserInfo={this.getUserInfo}>用户信息</Button>*/}
      </View>
    )
  }

  // getUserInfo = (res) => {
  //   console.log(res, 123)
  // }

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

  // 跳转页面
  toPage = (page) => {
    // 跳小程序页面和h5页面
    if (page.url.includes('/info')) {
      let infoId = '28011235'
      Taro.setStorageSync('infoId', infoId)
      Taro.switchTab({
        url: page.url.replace('/info', '')
      })
    } else if (page.url.includes('/tab')) {
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
    // else {
    //   var query: any = Taro.createSelectorQuery()
    //   query.selectViewport().scrollOffset()
    //   query.select(".tab-list").boundingClientRect()
    //   query.exec(function (res: any): void {
    //     // console.log(res, 123)
    //     var miss: number = res[0].scrollTop + res[1].top - 10
    //     Taro.pageScrollTo({
    //       scrollTop: miss,
    //       duration: 200
    //     });
    //   });
    // }
  }

  // 切换商品推荐列表
  changeTab = (index) => {
    this.setState({
      tabIndex: index,
      themeId: index === 1 ? '101098' : '',
      excludeThemeId: index === 2 ? '101098' : '',
      // recommendList: [],
      startIndex: 0
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

  // 跳转商城提交订单
  toMall = (item) => {
    let infoId = item.infoId
    Taro.setStorageSync('infoId', infoId)
    Taro.switchTab({
      url: `/pages/mall/index`
    })
  }
}

export default Index

