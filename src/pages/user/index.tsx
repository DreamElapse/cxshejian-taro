import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView, View } from '@tarojs/components'

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
    webviewUrl: 'https://testm.lvyoupdd.com/user?siteId=6'
  }
  componentWillUnmount () { }

  componentDidShow () {
    let time = new Date().getTime()
    this.setState({
      webviewUrl: `https://testm.lvyoupdd.com/user?time=${time}siteId=6`
    })
  }

  componentDidHide () {
    console.log(789)
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

