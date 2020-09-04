import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, WebView } from '@tarojs/components'

// import { add, minus, asyncAdd } from '../../store/actions'

import './index.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
  activeIndex: number,
  tabList: Array<string>,
  scrollNow: string,
  url: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Demo {
  props: IProps;
}

@connect(({ counter }) => ({
  ...counter
}), () => ({

}))
class Demo extends Component {
  state: PageState = {
    activeIndex: 0,
    tabList: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    scrollNow: 'a',
    url: 'https://www.baidu.com'
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }

  render () {
    const { tabList, activeIndex, scrollNow, url } = this.state
    return (
      <View className='demo'>
        {/*<WebView src={url}></WebView>*/}
        <ScrollView className='tab-box' scrollX scrollIntoView={'item'+activeIndex} scrollWithAnimation>
          {
            tabList.map((item, index) => {
              return <View className={`tab-item ${activeIndex === index && 'active'}`} key={'item'+index} id={'item'+index} onClick={() => {this.changeTab(index)}}>{item}</View>
            })
          }


        </ScrollView>

      </View>
    )
  }

  changeTab(index) {
    let select = Taro.createSelectorQuery()
    // let tabItem =
    this.setState({
      activeIndex: index
    })
  }
}

export default Demo

