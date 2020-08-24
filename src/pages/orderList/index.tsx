import React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView, Block } from '@tarojs/components'
import API from '@/api'

import moment from 'dayjs'

import noOrderIcon from '@/static/img/createOrder/no_order.png'
import logo from '@/static/img/index/logo.png'

import AuthButton from "@/components/anth_button/auth_button"
import OrderItem from "@/components/order_item/order_item";

import { onChangeAuthType } from '@/store/actions'

import './index.scss'

type PageStateProps = {
  isShowAuthButton: boolean

}

type PageDispatchProps = {
  onChangeAuthType: () => any
}

type PageOwnProps = {}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface OrderList {
  props: IProps;
}

const STATUS = [-1, 0, 2, 3, 4]; // 订单状态编码
const PAY_STATUS = [-1, 0, 1, 1, 1]; // 订单支付状态编码

@connect(({ counter }) => ({
  ...counter
}), (dispatch) => ({
  onChangeAuthType(payload) {
    dispatch(onChangeAuthType(payload))
  }
}))

class OrderList extends Component {
  state = {
    currentTab: 0,
    currentPage: 1,
    orderList: [],
    timer: null,
    orderNumber: null,
    isScan: false,
    isRefresh: false,
    currentOrderType: 0
  }

  UNSAFE_componentWillMount(): void {
    let q;
    let $router = getCurrentInstance().router
    q = $router.params['q']
    let orderNumber = decodeURIComponent(q).split('=')[1];
    let scanText = decodeURIComponent(q).indexOf('ordernumber') > -1;
    if (orderNumber && scanText) {
      this.setState({
        orderNumber,
        isScan: true
      });
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    const { orderList, isRefresh, currentOrderType, currentTab } = this.state;
    const carriageTabList = [
      { title: '全部' },
      { title: '待付款' },
      { title: '待收货' },
      { title: '已完成' },
      { title: '已取消' }
    ];
    const orderTypes = ['车厢订单', '商城订单'];

    return (
      <View className='order-list'>
        {
          this.props.isShowAuthButton
            ?
            <View className='auth'>
              <Image src={logo} mode='aspectFit' className='logo' />
              <View className='btn-container'>
                {
                  this.props.isShowAuthButton &&
                  <AuthButton onAfterAuthorized={this.afterAuthorized} />
                }
                <Button className='btn'>授权登录</Button>
              </View>
            </View>
            :
            <Block>
              <View className="order-type">
                {
                  orderTypes.map((type, i) => {
                    return (
                      <View
                        className={`type ${currentOrderType === i ? 'active' : ''}`}
                        key={i}
                        onClick={e => this.changeOrderType(e, i)}
                      >
                        {type}
                      </View>
                    )
                  })
                }
              </View>
              {
                // 车厢订单
                currentOrderType === 0 &&
                // <AtTabs
                //   tabList={carriageTabList}
                //   current={this.state.currentTab}
                //   onClick={this.changeTab}
                // />
                <View className="tab-box">
                  {
                    carriageTabList.map((item, index) => {
                      return <Text className={`tab-item ${currentTab === index ? 'active' : ''}`} key={'tab'+index} onClick={() => this.changeTab(index)}>{item.title}</Text>
                    })
                  }
                </View>
              }

              <ScrollView
                className='order-list-container'
                scrollY
                refresherEnabled
                refresherTriggered={isRefresh}
                onRefresherRefresh={this.refresh}
                onScrollToLower={this.reachBottom}
              >
                {
                  orderList.length > 0
                    ?
                    <View style="min-height: 100%">
                      {
                        orderList.map((order, idx) => {
                          return (
                            <OrderItem
                              order={order}
                              key={idx}
                              afterUrgeOrder={this.getOrderList}
                            />
                          )
                        })
                      }
                    </View>
                    :
                    <View className='no-data'>
                      <Image src={noOrderIcon} mode='aspectFit' />
                      <View className='tip'>暂无订单,快去逛逛吧~</View>
                    </View>
                }
              </ScrollView>
            </Block>
        }
      </View>
    )
  }

  // 验证授权
  verifyAuth = () => {
    API.Global.verifyAuth().then(isVerify => {
      if (isVerify) {
        if (this.state.isScan) {
          this.bindOrderToUser();
        } else {
          this.getOrderList();
        }
      }
      this.props.onChangeAuthType(!isVerify);
    });
  }

  // 绑定订单到用户
  bindOrderToUser = () => {
    API.Order.bindOrderToUser(this.state.orderNumber).then(res => {
      if (res) {
        this.getOrderList();
      }
    });
  }

  // isReachBottom ==> 为true说明是上拉加载请求, isPullDownRefresh ===> 为true说明是下拉刷新
  getOrderList = (isReachBottom = false, isPullDownRefresh = false) => {
    const data = {
      pageNumber: this.state.currentPage,
      pageSize: 10,
      status: STATUS[this.state.currentTab],
      payStatus: PAY_STATUS[this.state.currentTab],
    };
    API.Order.getOrderList(data).then(orders => {
      if (isPullDownRefresh) {
        this.setState({orderList: []}, () => {
          this.handleOrderList(orders.items, isReachBottom);
        });
      } else {
        this.handleOrderList(orders.items, isReachBottom);
      }
    });
  }

  // 处理订单信息
  handleOrderList = (orderList, isReachBottom) => {
    let newOrderList = [...this.state.orderList];
    // 如果订单列表为空，直接添加数据
    if (!this.state.orderList.length) {
      newOrderList = orderList;
    } else {
      // 如果是下拉加载，则直接在数组中添加数据
      if (isReachBottom) {
        orderList.forEach(item => {
          newOrderList.push(item);
        });
      } else {
        // 如果不是下拉加载，判断是否改变订单状态和催单状态
        newOrderList.forEach(order => {
          orderList.forEach(item => {
            if (item.orderId === order.orderId) {
              order.status = item.status !== order.status ? item.status : order.status;
              order.isUrge = item.isUrge !== order.isUrge ? item.isUrge : order.isUrge;
            }
          });
        });
      }
    }
    this.setState({
      orderList: newOrderList,
      isRefresh: false
    });
  }

  // 切换车厢订单类型
  changeTab = (index) => {
    this.setState({
      currentTab: index,
      currentPage: 1
    }, () => {
      // this.getOrderList(false, true);
    });
  }

  // 切换订单列表类型
  changeOrderType = (e, type: number) => {
    this.setState({
      currentTab: 0,
      currentOrderType: type
    });
  }

  // 下拉刷新
  refresh = () => {
    this.setState({
      currentPage: 1,
      isRefresh: true
    }, () => {
      this.getOrderList(false, true);
    });
  }

  // 上拉加载更多
  reachBottom = () => {
    let page = this.state.currentPage + 1;
    this.setState({currentPage: page}, () => {
      this.getOrderList(true);
    });
  }

  // 用户授权后
  afterAuthorized = () => {
    // 判断是否是扫码进入
    if (this.state.isScan) {
      this.bindOrderToUser();
    } else {
      this.getOrderList();
    }
  }

}

export default OrderList

