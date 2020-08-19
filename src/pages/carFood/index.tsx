import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Image, Text } from '@tarojs/components'

import goods from '@/static/img/goodsList/noodle.jpg'
import addIcon from '@/static/img/goodsList/add.png'
import subIcon from '@/static/img/goodsList/sub.png'
import shoppingCart from '@/static/img/goodsList/shopping-cart.png'
import clear from '@/static/img/goodsList/clear.png'

import './index.scss'

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

interface CarFood {
  props: IProps;
}

const goodsList = [
  {
    img: goods,
    name: '方便面',
    price: '15',
    id: 1
  },
  {
    img: goods,
    name: '方便面',
    price: '15',
    id: 2
  },
  {
    img: goods,
    name: '方便面',
    price: '15',
    id: 3
  }
]

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  
}))
class carFood extends Component {

  state = {
    goodsList,
    showBg: false,
    cartGoods: [
      {name: '方便面', price: 1.00, id: 1, number: 2},
      {name: '方便面', price: 2.01, id: 2, number: 1},
      {name: '方便面', price: 3.00, id: 3, number: 1}
    ]
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { goodsList, showBg, cartGoods } = this.state
    return (
      <View className='car-food'>
        <View className='content'>

          <Image src="" mode="aspectFill" className='topImg'></Image>
          <Text className='list-title'>G500车次商品推荐</Text>
          {/*-----商品列表------*/}
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
          <View className={`shopping-cart ${showBg && 'active'}`}>
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
                      <Image src={subIcon} className='sub-icon' onClick={(e) => this.changeGoodsNumber(item, 'sub', e)}></Image>
                      <Text className='number'>{item.number}</Text>
                      <Image src={addIcon} className='add-icon' onClick={(e) => this.changeGoodsNumber(item, 'add', e)}></Image>
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
      total += +((total * 100 + item.number * item.price * 100)/100).toFixed(2)
    })
    return total
  }
  toAccount = () => {
    Taro.navigateTo({
      url: 'createOrder'
    })
  }
  changeGoodsNumber = (item, type, event) => {
    console.log(event)
    event.stopPropagation()
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

export default carFood

