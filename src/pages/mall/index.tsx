import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Mall {
  props: IProps;
}

@connect(() => ({

}), () => ({

}))
class Mall extends Component {
  state = {
    params: 'siteId=6'
  }

  componentDidShow () {
    let infoId = Taro.getStorageSync('infoId')
    infoId && this.setState({
      params: `siteId=6&environmental=t&page=product&infoId${infoId}`
    })
    Taro.removeStorageSync('infoId')
  }

  UNSAFE_componentWillUnmount () { }

  componentDidHide () { }

  onLoad () {
    // localStorage.setItem('zowoyooToken','2222222222')
  }

  render () {
    const { params } = this.state
    return (
      <WebView src={`https://testm.lvyoupdd.com:8083/home?${params}`} />
    )
  }
}

export default Mall

