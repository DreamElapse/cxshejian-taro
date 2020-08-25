import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import moment from 'dayjs'

import { resetGoodsAndPrice } from '@/store/actions'


import failIcon from '@/static/img/createOrder/pay_fail.png'
import successIcon from '@/static/img/createOrder/pay_success.png'
import './index.scss'

type PageStateProps = {
  totalPrice: number,
  num: number
}

type PageDispatchProps = {
  resetGoodsAndPrice: () => void
}

type PageOwnProps = {}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface PayResult {
  props: IProps;
}

@connect(({ counter }) => ({
  ...counter
}), (dispatch) => ({
  resetGoodsAndPrice(payload) {
    dispatch(resetGoodsAndPrice)
  }
}))
class PayResult extends Component {

  state = {
    payResult: false
  }

  UNSAFE_componentWillMount() {
    Taro.setNavigationBarTitle({
      title: '支付成功'
    })
  }

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }

  render () {
    const { payResult } = this.state
    return (
      <View className='pay-result'>
        <Image src={payResult ? successIcon : failIcon} className='success-icon' mode="aspectFill"> </Image>
        <View className={`tip ${payResult && 'fail'}`}>{payResult ? '订单已经支付成功!' : '很抱歉,支付失败!'}</View>
        {payResult && <View className='sub-tip'>感谢您的购买!</View>}
        {
          payResult && <View className='pay-info'>
            <View className='price'>支付金额：<Text>￥{this.props.totalPrice}</Text></View>
            <View className='time'>支付时间：<Text>{moment().format('YYYY-MM-DD HH:mm:ss')}</Text></View>
          </View>
        }
        {
          !payResult && <View>
          <Button className='btn order-fail' onClick={this.toOrderList}>查看订单</Button>
          <Button className='btn pay' onClick={this.rePay}>重新支付</Button>
        </View>
        }
        {
          payResult && <View>
            <Button className='btn back' onClick={this.backToIndex}>返回首页</Button>
            <Button className='btn order' onClick={this.toOrderList}>查看订单</Button>
          </View>
        }
      </View>
    )
  }

  toOrderList = () => {
    this.props.resetGoodsAndPrice();
    Taro.navigateTo({url: '/pages/user/user'});
  }

  rePay = () => {
    this.orderService.getOrderDetail(this.$router.params.orderId).then(order => {
      this.payService.pay(order, order.train);
    });
  }

  backToIndex = () => {
    this.props.resetGoodsAndPrice();
    Taro.switchTab({url: '/pages/index/index'});
  }
}

export default PayResult

