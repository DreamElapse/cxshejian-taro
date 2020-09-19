import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import API from '@/api'
// import { add, minus, asyncAdd } from '../../store/actions'

import './index.scss'

import noodle from '@/static/img/goodsList/noodle.jpg'
import dingwei from '@/static/img/goodsList/dingwei.png'
import biaoqian from '@/static/img/goodsList/biaoqian.png'

type PageStateProps = { }

type PageDispatchProps = { }

type PageOwnProps = {}

type PageState = { }

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface RankList { props: IProps; }

const defaultRankList: Array<any> = [
  {
    img: noodle,
    title: '点都德',
    city: '广州',
    tag: ['#十分nice', '#环境优美', '#资深吃货必备'],
    detail: '金沙红米肠外皮脆酥'
  },
  {
    img: noodle,
    title: '点都德',
    city: '广州',
    tag: ['#十分nice', '#环境优美', '#资深吃货必备'],
    detail: '金沙红米肠外皮脆酥'
  }
]

@connect(({ counter }) => ({
  ...counter
}), () => ({

}))
class RankList extends Component {
  state = {
    id: '',
    rankData: {},
    rankList: [],
    city: ''
  }


  UNSAFE_componentWillMount() {
    let router: any = getCurrentInstance().router
    let id = router.params.id
    let city = router.params.city
    console.log(router, 1)
    if (id) {
      this.setState({
        id,
        city
      }, () => {
        console.log(this.state.id, 88)
        this.getRankList()
      })
    } else {
      Taro.navigateBack({
        delta: 1
      })
    }
    
  }

  componentDidShow () {

  }

  componentDidHide () { }

  render () {
    const { rankList, rankData, city } = this.state
    return (
      <View className='rank-list'>
        <Image src={rankData.imageUrl} className="top-bg" mode="aspectFill"></Image>
        <View className="rank-content">
          {
            rankList.map((item, index) => {
              return (
                <View className="rank-item" key={'rank'+index} onClick={() => {this.toProduct(item.toUrl)}}>
                  <View className="rank-main">
                    <Image src={item.imageUrl} className="item-img" mode="aspectFill"></Image>
                    <View className="item-context">
                      <View className="item-title">
                        <Text className="title">{item.name}</Text>
                        <View className="title-right">
                          <Image src={dingwei} className="right-icon"></Image>
                          <Text className="city-name">{city}</Text>
                        </View>
                      </View>

                      <View className="tag-list">
                        {
                          item.tag.split(',').map((tag, ind) => {
                            return <Text className="tag" key={'tag'+ind}>{tag}</Text>
                          })
                        }
                      </View>

                      <Text className="item-detail">{item.comment}</Text>
                    </View>
                  </View>
                  <View className="top-icon">
                    <Image src={biaoqian} className="icon-bg" mode="aspectFill"></Image>
                    <Text className="icon-number">{index + 1}</Text>
                  </View>

                </View>
              )
            })
          }
        </View>


      </View>
    )
  }

  // 获取榜单列表
  getRankList = () => {
    API.Home.getRankList({id: this.state.id})
      .then(res => {
        if (res.data) {
          Taro.setNavigationBarTitle({
            title: 'res.data.name'
          })
          this.setState({
            rankList: res.data.placardProductVos,
            rankData: res.data
          })
        }
      })
  }
  // 点击榜单跳转
  toProduct = (url) => {
    Taro.switchTab({
      // url: `/pages/mall/index?rank=${id}`
      url
    })
  }
}

export default RankList

