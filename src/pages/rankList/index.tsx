import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'

// import { add, minus, asyncAdd } from '../../store/actions'

import './index.scss'

import noodle from '@/static/img/goodsList/noodle.jpg'
import dingwei from '@/static/img/goodsList/dingwei.png'
import biaoqian from '@/static/img/goodsList/biaoqian.png'


type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface RankList {
  props: IProps;
}

const rankList = [
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
    areaId: ''
  }


  UNSAFE_componentWillMount() {
    // let router = getCurrentInstance().router
    // let areaId = router.params.areaId
    // console.log(areaId, !areaId, 456)
    // if (areaId) {
    //   this.setState({
    //     areaId
    //   })
    // } else {
    //   // Taro.navigateBack({
    //   //   delta: 1
    //   // })
    // }
  }

  componentDidShow () {

  }

  componentDidHide () { }

  render () {
    const { } = this.state
    return (
      <View className='rank-list'>
        <Image src={noodle} className="top-bg" mode="aspectFill"></Image>
        <View className="rank-content">
          {
            rankList.map((item, index) => {
              return (
                <View className="rank-item" key={'rank'+index}>
                  <View className="rank-main">
                    <Image src={item.img} className="item-img"></Image>
                    <View className="item-context">
                      <View className="item-title">
                        <Text className="title">{item.title}</Text>
                        <View className="title-right">
                          <Image src={dingwei} className="right-icon"></Image>
                          <Text className="city-name">{item.city}</Text>
                        </View>
                      </View>

                      <View className="tag-list">
                        {
                          item.tag.map((tag, ind) => {
                            return <Text className="tag" key={'tag'+ind}>{tag}</Text>
                          })
                        }
                      </View>

                      <Text className="item-detail">{item.detail}</Text>
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

  changeTab(index) {
    // let select = Taro.createSelectorQuery()
    // let tabItem =
    this.setState({
      activeIndex: index
    })
  }
}

export default RankList

