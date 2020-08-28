import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Image, Text, Input, Picker, Button, PickerView, PickerViewColumn } from '@tarojs/components'
import CartBar from '@/components/cart_bar/cart_bar'
import moment from 'dayjs'
import Utils from '@/utils/utils'
import arrow from '@/static/img/createOrder/arrow.png'
import API from '@/api'

import {

} from '@/store/actions'

import './index.scss'

const CARRIAGE_1_8 = ['1车', '2车', '3车', '4车', '5车', '6车', '7车', '8车'];
const CARRIAGE_9_16 = ['9车', '10车', '11车', '12车', '13车', '14车', '15车', '16车'];
const CARRIAGE_1_16 = ['1车', '2车', '3车', '4车', '5车', '6车', '7车', '8车', '9车', '10车', '11车', '12车', '13车', '14车', '15车', '16车'];
const ROW = ['1排', '2排', '3排', '4排', '5排', '6排', '7排', '8排', '9排', '10排', '11排', '12排', '13排', '14排', '15排', '16排', '17排', '18排', '19排', '20排', '21排', '无排'];
const SEAT = ['A座', 'B座', 'C座', 'D座', 'F座', '无座'];

const APP = Taro.getApp();

type PageStateProps = {
  train: string,
  date: string,
  startStation: object,
  endStation: any,
  carriage: any,
  carriageNum: any,
  isLink: boolean,
  selectedGoodsList: any[],
  userInfo: string,
  totalPrice: number
}

type PageDispatchProps = {

}

type PageOwnProps = {}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
// type IProps = PageDispatchProps & PageOwnProps

interface CreateOrder {
  props: IProps;
}

@connect(({ counter }) => ({
  ...counter
}), () => ({

}))

class CreateOrder extends Component {
  state = {
    mealsDateIndex: 0,
    mealsDate: [],
    seat: [],
    seatIdx: [0, 0, 0],
    selectedSeat: '请选择座位信息',
    isSelectedSeat: false,
    username: '',
    mobile: '',
    memo: '',
    isOpenMulitSeletor: false,
    cartGoods: []
  }

  UNSAFE_componentWillMount() {
     // 判断是否为重连车
     let carriage;
     if (this.props.isLink) {
       carriage = this.props.carriage === 'A' ? CARRIAGE_1_8 : CARRIAGE_9_16;
     } else {
       if (this.props.carriageNum === '8') {
         carriage = CARRIAGE_1_8;
       } else {
         carriage = CARRIAGE_1_16;
       }
     }

     this.setState({
       seat: [carriage, ROW, SEAT],
       cartGoods: Taro.getStorageSync('goods')
       // selectedSeat: `${carriage[0]} - ${ROW[0]} - ${SEAT[0]}`
     });
     // this.getDeliveryTime();
     // this.getProductionRecList();
  }

  componentWillUnmount () { }

  componentDidShow () {
    // this.setState({
    //   requestId: Date.now()
    // });
    // this.beforeCreateOrder();
  }

  componentDidHide () { }

  /*----render-----*/
  render () {
    const { username, mobile, selectedSeat, memo, mealsDate, mealsDateIndex, cartGoods } = this.state
    const { startStation, endStation, train, date, selectedGoodsList, totalPrice } = this.props
    return (
      <View className="create-order">
        <View className='order-content'>
        <View className='train-info'>
          <View className='start-train'>
            <View className='date'>{startStation.aTime}</View>
            <View className='train-name'>{startStation.station}</View>
          </View>
          <View className='train'>
            <View className='train-num'>{train}</View>
            <View className='train-arrow'></View>
            <View className='date'>{moment(date).format('MM月DD日')}</View>
          </View>
          <View className='end-train'>
            <View className='date'>{endStation.aTime}</View>
            <View className='train-name'>{endStation.station}</View>
          </View>
        </View>
        <View className='order-info-container'>
          <View className='form-container'>
            <View className='form-item'>
              <Text>姓名</Text>
              <Input placeholderClass='input-placeholder' placeholder='请输入姓名' data-name='username' value={username} onInput={this.setFormValue} />
            </View>
            <View className='form-item'>
              <Text>手机号</Text>
              <Input placeholderClass='input-placeholder' placeholder='请输入手机号' type='number' maxlength={11} data-name='mobile' value={mobile} onInput={this.setFormValue} />
              {/*<View className="get-phone" onClick={this.getPhone}>获取手机号</View>*/}
              <Button
                className='get-phone'
                openType='getPhoneNumber'
                onGetPhoneNumber={this.getPhoneNumber}
              >微信手机号</Button>
            </View>
            <View className='form-item selection'>
              <Text>送餐至</Text>
              <View className='input-placeholder' onClick={this.openMulitSeletor}>{selectedSeat}</View>
            </View>
            <View className='form-item selection'>
              <Text>送餐时间</Text>
              <Picker range={mealsDate} value={mealsDateIndex} onChange={this.changeMealsDatePicker}>
                <View className='input-placeholder'>{mealsDate[mealsDateIndex]}</View>
              </Picker>
            </View>
            <View className='form-item'>
              <Text>备注</Text>
              <Input placeholderClass='input-placeholder' placeholder='备注' data-name='memo' value={memo} onInput={this.setFormValue} />
            </View>
          </View>
          <View className='order-info'>
            <View className='title'>订单信息</View>
            {
              selectedGoodsList.map((goods, idx) => {
                return (
                  <View className='order-item' key={idx}>
                    <Image className='pro-pic' src={goods.thumbImg} mode='aspectFill' />
                    <View className='goods-msg'>
                      <View className='name'>{goods.productName}</View>
                      <View className='price-container'>
                        <Text className='price'>¥{goods.price}/份</Text>
                        <Text className='num'>x{goods.number}</Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View className='cart-bar'>
          <CartBar
            isShowCartIcon={false}
            totalPrice={totalPrice}
            totalNum={this.totalProNum()}
            toCreateOrder={this.requestPayment}
          />
        </View>

        <View className={`float-layout-bg ${this.state.isOpenMulitSeletor && 'active'}`} onClick={this.closeMulitSeletor}>
          <View className={`float-layout ${this.state.isOpenMulitSeletor && 'active'}`} onClick={e => e.stopPropagation()}>
            <View className='picker-confirm-btn' onClick={this.confirmSeat}>确定</View>
            <PickerView
              value={this.state.seatIdx}
              indicatorStyle='height: 40px;' style='width: 100%;height: 300px;text-align: center;line-height: 40px;'
              onChange={this.changeSeatPicker}
            >
              {
                this.state.seat.map((column, idx) => {
                  return (
                    <PickerViewColumn key={idx}>
                      {
                        column.map((item, i) => {
                          return (
                            <View key={i * 1000}>{item}</View>
                          )
                        })
                      }
                    </PickerViewColumn>
                  )
                })
              }
            </PickerView>
          </View>
        </View>
      </View>
      </View>
    )
  }

  // 获取用户手机号
  getPhoneNumber = e => {
    console.log(e)
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      let data = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }
      API.Global.getPhoneNumber(data)
        .then(res => {
          if (res.data) {
            Taro.setStorageSync('phone', res.data)
            this.setState({
              mobile: res.data
            })
          }
        })
    }
  }

  /*----自定义函数-----*/
  // 获取用户信息
  getUserInfo = () => {
    API.Global.getUserInfo().then(user => {
      let userInfo = {
        avatar: user.avatar,
        mobile: user.mobile,
        nickname: user.nickname,
      };
      this.props.setUserInfo(userInfo);
      this.setState({ mobile: userInfo.mobile });
    });
  }

  totalProNum() {
    let number = 0
    let goodsList: any[] = this.props.selectedGoodsList
    goodsList.forEach(item => {
      number += item.number
    })
    return number
  }

  requestPayment = () => {
    let data = {
      orderId: 1,
      tradeType: 'WX_JSAPI',
      userId: ''
    }
    API.Order.createPayment(data)
      .then(res => {
        let data = {
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.packages,
          signType: res.data.signType,
          paySign: res.data.paySign,
        }
        console.log(data, 111)
        Taro.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.packages,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success () {
            console.log('-----success------')
            Taro.redirectTo({
              url: `/pages/payResult/index`
            })
          },
          fail () {
            console.log('-----fail------')
            // let search: string[] = []
            // for (let key in data) {
            //   search.push(`${key}=${data[key]}`)
            // }
            Taro.redirectTo({
              url: `/pages/payResult/index?orderId=${data.orderId}`
            })
          }
        })
      })
  }

  // // 调用预下单信息
  // beforeCreateOrder = () => {
  //   this.orderService.beforeCreateOrder().then(info => {
  //     this.setState({ beforeCreateOrderInfo: info });
  //     this.calcSelectedGoodsTotalPrice(info.status);
  //   });
  //   this.getUserInfo();
  // }


  // 获取配送时间
  getDeliveryTime = () => {
    const data = {
      cid: this.props.carriage,
      train: this.props.train,
      date: this.props.date,
      ssid: this.props.startStation.id,
      seid: this.props.endStation.id,
      stime: this.props.startStation.aTime,
      carriage: this.props.carriage
    }
    API.Order.getDeliveryTime(data).then(times => {
      this.handleMealDate(times);
    })
  }

  // 处理配送时间数组数据
  handleMealDate = (mealsDate) => {
    let newMealsDate = [];
    mealsDate.forEach(data => {
      if (data.length > 1) {
        newMealsDate.push(`${data[0]}-${data[1]}`);
      } else {
        newMealsDate.push(`${data[0]}`);
      }
    });
    this.setState({ mealsDate: [...newMealsDate] });
  }

  // 设置表单值
  setFormValue = (e) => {
    this.setState({ [e.currentTarget.dataset['name']]: e.currentTarget.value });
  }

  // 打开座位选择
  openMulitSeletor = () => {
    this.setState({ isOpenMulitSeletor: true });
  }

  // 关闭座位
  closeMulitSeletor = () => {
    this.setState({ isOpenMulitSeletor: false });
  }

  // 选择座位触发
  changeSeatPicker = (e) => {
    let idxs = [...e.detail.value];
    this.setState({
      seatIdx: idxs,
    });
  }

  // 确认座位选择
  confirmSeat = () => {
    let idxs = this.state.seatIdx;
    if (this.state.seat[1][idxs[1]] === '无排') {
      // 如果为无排无座，更改数组下标
      idxs[2] = SEAT.length - 1;
      this.setState({
        seatIdx: idxs,
        selectedSeat: `${this.state.seat[0][idxs[0]]} - 无排 - 无座`,
        isOpenMulitSeletor: false,
        isSelectedSeat: true
      });
    } else {
      this.setState({
        isOpenMulitSeletor: false,
        isSelectedSeat: true,
        selectedSeat: `${this.state.seat[0][idxs[0]]} - ${this.state.seat[1][idxs[1]]} - ${this.state.seat[2][idxs[2]]}`
      });
    }
  }

  // 选择送餐时间
  changeMealsDatePicker = (e) => {
    this.setState({ mealsDateIndex: e.detail.value });
  }

  // 创建订单
  createOrder = () => {
    // 验证用户名
    if (!this.state.username) {
      Taro.showToast({ title: '请输入姓名', icon: 'none', duration: 1500, mask: true });
      return;
    }
    if (!/^[\u4e00-\u9fa5_a-zA-Z\u00a0|\u0020]+$/.test(this.state.username)) {
      Taro.showToast({ title: '姓名只能输入中英文', icon: 'none', duration: 1500, mask: true });
      return;
    }
    // 是否选择座位
    if (!this.state.isSelectedSeat) {
      Taro.showToast({ title: '请选择座位信息', icon: 'none', duration: 1500, mask: true });
      return;
    }
    // 验证手机号
    if (!this.state.mobile) {
      Taro.showToast({ title: '请输入手机号码', icon: 'none', duration: 1500, mask: true });
      return;
    }
    if (!Utils.regMobile(this.state.mobile)) {
      Taro.showToast({ title: '请输入正确的手机号码', icon: 'none', duration: 1500, mask: true });
      return;
    }
    // 验证备注
    if (this.state.memo && !Utils.regZhOrEn(this.state.memo)) {
      Taro.showToast({ title: '备注只能输入中英文和数字', icon: 'none', duration: 1500, mask: true });
      return;
    }
    // 处理商品信息
    let order = {
      totalPrice: this.props.totalPrice,
      child: []
    };
    this.props.selectedGoodsList.forEach(goods => {
      order.child.push({
        proId: goods.id,
        proName: goods.proName,
        num: goods.selectedNum,
        price: goods.price
      });
    });
    // 处理车厢信息
    let carriage = this.state.seat[0][this.state.seatIdx[0]];
    // 处理座位信息
    let site = '无座';
    let row = ROW[this.state.seatIdx[1]];
    let seat = SEAT[this.state.seatIdx[2]];
    if (this.state.seatIdx[2] !== SEAT.length - 1) {
      site = `${row.substr(0, row.length - 1)}${seat.substr(0, seat.length - 1)}`;
    }
    const data = {
      totalPrice: this.props.totalPrice,
      train: this.props.train,
      seid: this.props.endStation.id,
      carriage: carriage.substr(0, carriage.length - 1),
      site: site,
      mobile: this.state.mobile,
      mpId: this.commonService.getMpId(),
      dbTime: this.state.mealsDate[this.state.mealsDateIndex],
      order,
      username: this.state.username || this.props.userInfo.nickname || this.props.userInfo.nickName,
      memo: this.state.memo
    }
    API.Order.createOrder(data, this.state.requestId.toString()).then(res => {
      if (res) {
        // 创建订单成功，开始调起支付接口 res.data.bid/order_id/protype
        this.requestPayment(res.data)
        // 发送统计数据
        this.sendEventAfterThis();
      }
    });
  }

  // 发送统计数据-由推广二维码进入
  sendEventAfterThis = () => {
    if (Utils.isWeApp() && this.props.promoteStation) {
      const H = Utils.getCurrentDateRangeForHour();
      APP.aldstat.sendEvent(`${this.props.promoteStation}-下单`, H);
    }
  }
}

export default CreateOrder

