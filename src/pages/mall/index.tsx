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

interface Mall {
  props: IProps;
}

@connect(() => ({

}), () => ({

}))
class Mall extends Component {
  state = {
    webViewUrl: 'http://testm.lvyoupdd.com:8083/home?siteId=6'
  }
  componentWillUnmount () { }

  componentDidShow () { 
    this.setState({
      webViewUrl: `http://testm.lvyoupdd.com:8083/home?siteId=6`
    })
  }

  componentDidHide () { }
  onLoad () { 
    localStorage.setItem('zowoyooToken','2222222222')
  }
  

  render () {
    return (
      <WebView src={this.state.webViewUrl} />
    )
  }
}

export default Mall

