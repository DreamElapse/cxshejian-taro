import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView, View } from '@tarojs/components'
import config from '../../utils/config'

import './index.scss'
type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface User {
  props: IProps;
}

@connect(() => ({

}), () => ({

}))
class User extends Component {
  state = {
    webviewUrl: `${[config[config.environmental]]}user?siteId=6`
  }
  componentWillUnmount () { }

  componentDidShow () {
    let time = new Date().getTime()
    this.setState({
      webviewUrl: `${[config[config.environmental]]}user?time=${time}siteId=6`
    })
  }

  componentDidHide () {
    this.setState({
      webviewUrl: ''
    })
  }

  render () {
    return (
      <WebView src={this.state.webviewUrl} />
    )
  }
}

export default User

