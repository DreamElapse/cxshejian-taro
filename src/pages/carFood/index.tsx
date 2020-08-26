import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Image, Text } from '@tarojs/components'
import API from '@/api'

import addIcon from '@/static/img/goodsList/add.png'
import subIcon from '@/static/img/goodsList/sub.png'
import shoppingCart from '@/static/img/goodsList/shopping-cart.png'
import clear from '@/static/img/goodsList/clear.png'

import {
  addGoods,
  setTotalPrice
} from '@/store/actions'

import './index.scss'

type PageStateProps = {
  train: string,
  date: string
}

type PageDispatchProps = {
  addGoods: (any) => any
  setTotalPrice: (any) => any
}

type PageOwnProps = {}

type PageState = {
  topAd: any[],
  goodsList: any[],
  showBg: boolean,
  cartGoods: object[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CarFood {
  props: IProps;
}


@connect(({ counter }) => ({
  ...counter
}), (dispatch) => ({
  addGoods(payload) {
    dispatch(addGoods(payload));
  },
  setTotalPrice(payload) {
    dispatch(setTotalPrice(payload));
  }
}))

class CarFood extends Component {

  state: PageState = {
    topAd: [],
    goodsList: [],
    showBg: false,
    cartGoods: []
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getCarFood()
    this.getAdData()
  }

  componentDidHide () { }

  render () {
    const { goodsList, showBg, cartGoods, topAd } = this.state
    return (
      <View className='car-food'>
        <View className='content'>
          {topAd[0] && <Image src={topAd[0] && topAd[0].imageUrl} mode='aspectFill' className='topImg'> </Image>}
          <Text className='list-title'>{this.props.train}车次商品推荐</Text>
          {/*-----商品列表------*/}
          {
            goodsList.map((item, index) => {
              return (
                <View className='goods-box' key={'box'+index}>
                  {
                    item.map((goods, i) => {
                      return (
                        <View className='goods-item' key={'goods'+i}>
                          <Image src={goods.thumbImg} className='goods-img' mode='aspectFill'> </Image>
                          <Text className='goods-title'>{goods.productName}</Text>
                          <View className='goods-msg'>
                            <Text className='goods-price'>¥{goods.price}</Text>
                            <Image src={addIcon} className='add-icon' mode="aspectFill" onClick={() => this.addGoods(goods)}></Image>
                          </View>

                        </View>
                      )
                    })
                  }
                </View>
              )
            })
          }


        {/*-----底部功能区-----*/}
        <View className='bottom-handle'>
          <View className='shopping-cart-box' onClick={this.showBuy}>
            <Image src={shoppingCart} className='shopping-cart-icon'></Image>
            <Text className='cart-goods-num'>{cartGoods.length}</Text>
          </View>
          <Text className='total-money'>
            <Text className='unit'>¥</Text>
            {this.totalMoney()}
          </Text>
          <Text className='sumit-button' onClick={this.toAccount}>结算</Text>

        </View>

        {/*-----购物车列表-----*/}
        <View className={`buy-bg ${showBg && 'active'}`} onClick={this.hideBuy}>
          <View className={`shopping-cart ${showBg && 'active'}`} onClick={e => e.stopPropagation()}>
            <View className='cart-title'>
              <Text className='title'>购物车</Text>
              <View className='clear' onClick={this.clearCart}>
                <Image src={clear} className='clear-icon'></Image>
                <Text className='clear-text'>清空</Text>
              </View>
            </View>

            {
              cartGoods.map((item, index) => {
                return (
                  <View className='cart-goods-item' key={'cart'+index}>
                    <Text className='goods-name'>{item.productName}</Text>
                    <Text className='price'>¥{item.price}</Text>
                    <View className='number-handle'>
                      <Image src={subIcon} className='sub-icon' onClick={() => this.changeGoodsNumber(item, 'sub')}></Image>
                      <Text className='number'>{item.number}</Text>
                      <Image src={addIcon} className='add-icon' onClick={() => this.changeGoodsNumber(item, 'add')}></Image>
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

  getAdData = () => {
    // 广告标识code定义
    // 首页顶部：home-head
    // 首页中部：home-middle
    // 下单支付成功页面：pay-success
    // 车厢美食：train-banner
    API.Home.getAdData({code: 'train-banner'})
      .then(res => {
        let banner: [] = res.data.bannerImgList || []
        this.setState({
          topAd: banner,
        })
      })
  }

  // 获取商品列表
  getCarFood = () => {
    let data = {
      carriageRange: '',
      train: this.props.train,
      trainDate: this.props.date
    }
    API.CarFood.getCarData(data)
      .then(res => {

        // 小车厢
        let frontProduct = res.data.frontTrainProducts || []
        let  frontArr = frontProduct.map(item => {
          return item.products.slice(0, 3)
        })
        // 大车厢
        let backProduct = res.data.backTrainProducts || []
        let  backArr = backProduct.map(item => {
          return item.products
        })
        // console.log(frontArr, 11)
        this.setState({
          goodsList: frontArr
        })
        // let goodsList: any = []
        // goodsList = frontArr.map(item => {
        //   return item
        // })
        // backArr.forEach(item => {
        //   item.forEach(goods => {
        //     goodsList.push(goods)
        //   })
        // })

        // this.setState({
        //   goodsList: goodsList.slice(0, 2)
        // }, () => {
        //   console.log(this.state.goodsList, 111)
        // })
      })
  }

  // 添加商品到购物车
  addGoods = (goods) => {
    let cartGoods = this.state.cartGoods
    cartGoods.push({
      productName: goods.productName,
      price: goods.price,
      productId: goods.productId,
      number: 1
    })
    this.setState({
      cartGoods
    })
  }

  // 清空购物车
  clearCart = () => {
    this.setState({
      cartGoods: []
    })
  }

  // 显示隐藏购物车列表
  showBuy = () => {
    this.setState({
      showBg: true
    })
  }
  hideBuy = () => {
    this.setState({
      showBg: false
    })
  }

  // 计算总价
  totalMoney = () => {
    let total = 0
    let goodsList: any[] = this.state.cartGoods
    goodsList.forEach(item => {
      let price = +(item.price * 100).toFixed(2)
      total = (total*100 + item.number * price)/100
    })
    return total
  }

  // 跳转到提交订单页
  toAccount = () => {
    this.props.setTotalPrice(this.totalMoney())
    this.props.addGoods(this.state.cartGoods)
    Taro.navigateTo({
      url: '/pages/createOrder/index'
    })
  }

  // 修改购物车商品数量
  changeGoodsNumber = (item, type) => {
    // event.stopPropagation()
    let cartGoods: any[] = this.state.cartGoods
    let index = cartGoods.findIndex(goods => {
      return goods.id === item.id
    })
    type === 'add' && cartGoods[index].number++
    type === 'sub' && cartGoods[index].number--
    this.setState({
      cartGoods
    })
  }
}

export default CarFood

