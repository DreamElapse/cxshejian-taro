import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Image, Text } from '@tarojs/components'
import API from '@/api'

import goodsImg from '@/static/img/goodsList/noodle.jpg'
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
  addGoods: () => any
  setTotalPrice: () => any
}

type PageOwnProps = {}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CarFood {
  props: IProps;
}

const GOODS_LIST = [
  {
    img: goodsImg,
    name: '方便面',
    price: '15',
    id: 1
  },
  {
    img: goodsImg,
    name: '方便面',
    price: '15',
    id: 2
  },
  {
    img: goodsImg,
    name: '方便面',
    price: '15',
    id: 3
  }
]

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

  state = {
    goodsList: GOODS_LIST,
    showBg: false,
    cartGoods: [
      {name: '方便面', price: 1.00, id: 1, number: 2},
      {name: '方便面', price: 2.01, id: 2, number: 1},
      {name: '方便面', price: 3.00, id: 3, number: 1}
    ]
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getCarFood()
  }

  componentDidHide () { }

  render () {
    const { goodsList, showBg, cartGoods } = this.state
    return (
      <View className='car-food'>
        <View className='content'>

          <Image src='' mode='aspectFill' className='topImg'> </Image>
          <Text className='list-title'>G500车次商品推荐</Text>
          {/*-----商品列表------*/}
          <View className='goods-box'>
            {
              goodsList.map((item, index) => {
                return (
                  <View className='goods-item' key={'goods'+index}>
                    <Image src={item.img} className='goods-img' mode='aspectFill'> </Image>
                    <Text className='goods-title'>{item.name}</Text>
                    <View className='goods-msg'>
                      <Text className='goods-price'>¥{item.price}</Text>
                      <Image src={addIcon} className='add-icon' mode="aspectFill" onClick={() => this.addGoods(item)}></Image>
                    </View>

                  </View>
                )
              })
            }
          </View>
          <View className='goods-box'>
            {
              goodsList.map((item, index) => {
                return (
                  <View className='goods-item' key={'goods'+index}>
                    <Image src={item.img} className='goods-img' mode="aspectFill"></Image>
                    <Text className='goods-title'>{item.name}</Text>
                    <View className='goods-msg'>
                      <Text className='goods-price'>¥{item.price}</Text>
                      <Image src={addIcon} className='add-icon' mode="aspectFill" onClick={() => this.addGoods(item)}></Image>
                    </View>

                  </View>
                )
              })
            }
          </View>
          <View className='goods-box'>
            {
              goodsList.map((item, index) => {
                return (
                  <View className='goods-item' key={'goods'+index}>
                    <Image src={item.img} className='goods-img' mode="aspectFill"></Image>
                    <Text className='goods-title'>{item.name}</Text>
                    <View className='goods-msg'>
                      <Text className='goods-price'>¥{item.price}</Text>
                      <Image src={addIcon} className='add-icon' mode="aspectFill" onClick={() => this.addGoods(item)}></Image>
                    </View>

                  </View>
                )
              })
            }
          </View>

        </View>

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
              <View className='clear'>
                <Image src={clear} className='clear-icon'></Image>
                <Text className='clear-text'>清空</Text>
              </View>
            </View>

            {
              cartGoods.map((item, index) => {
                return (
                  <View className='cart-goods-item' key={'cart'+index}>
                    <Text className='goods-name'>{item.name}</Text>
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
    )
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
        this.setState({
          goodsList: res.data
        })
      })
  }

  addGoods = (goods) => {
    let cartGoods = this.state.cartGoods
    cartGoods.push({
      name: goods.name,
      price: goods.price,
      id: goods.id,
      number: 1
    })
    this.setState({
      cartGoods
    })
  }
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
  totalMoney = () => {
    let total = 0
    this.state.cartGoods.forEach(item => {
      let price = +(item.price * 100).toFixed(2)
      total = (total*100 + item.number * price)/100
    })
    return total
  }
  toAccount = () => {
    this.props.setTotalPrice(this.totalMoney())
    this.props.addGoods(this.state.cartGoods)
    Taro.navigateTo({
      url: '/pages/createOrder/index'
    })
  }
  changeGoodsNumber = (item, type) => {
    // event.stopPropagation()
    let cartGoods = this.state.cartGoods
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

