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
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <WebView src='http://testm.lvyoupdd.com/user?siteId=6' />
    )
  }
}

export default User

