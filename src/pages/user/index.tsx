import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView } from '@tarojs/components'

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
    webviewUrl: 'http://testm.lvyoupdd.com/user?siteId=6'
  }
  componentWillUnmount () { }

  componentDidShow () { 
    this.setState({
      webviewUrl: 'http://testm.lvyoupdd.com/user?siteId=6'
    })
    console.log(this.state.webviewUrl,'================')
  }

  componentDidHide () { }

  render () {
    return (
      <WebView src={this.state.webviewUrl} />
    )
  }
}

export default User

