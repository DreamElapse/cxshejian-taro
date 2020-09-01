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

  componentWillUnmount () { }

  componentDidShow () {
    let infoId = Taro.getStorageSync('infoId')
    infoId && this.setState({
      params: `siteId=6&page=product&infoId${infoId}`
    })
    Taro.removeStorageSync('infoId')
    console.log(this.state.params, 12)
  }

  componentDidHide () { }

  render () {
    const { params } = this.state
    return (
      <WebView src={`http://testm.lvyoupdd.com:8083/home?${params}`} />
    )
  }
}

export default Mall

