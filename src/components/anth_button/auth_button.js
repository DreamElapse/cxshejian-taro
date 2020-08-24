// import '@tarojs/async-await'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { connect } from 'react-redux'

// js
import API from '@/api'

// redux
import { onChangeAuthType, onSetUserInfo } from '@/store/actions'

// css
import './auth_button.scss'

@connect(({reducers}) => (
  {...reducers}
), (dispatch) => ({
  onChangeAuthType (payload) {
    dispatch(onChangeAuthType(payload));
  },
  onSetUserInfo (payload) {
    dispatch(onSetUserInfo(payload));
  },
}))
class AuthButton extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount () {
  }

  componentDidMount () { }

  getUserInfo = (e) => {
    e.stopPropagation();
    let userInfo = null;
    if (e.detail['userInfo']) {
      userInfo =  e.detail['userInfo'];
      userInfo['avatar'] = userInfo.avatarUrl;
      this.changeUserInfo(userInfo);
    }
  }

  async changeUserInfo(userInfo) {
    userInfo['nickname'] = userInfo.nickName;
    this.props.onSetUserInfo(userInfo);
    this.props.onChangeAuthType(false);

    await API.Global.changeUserInfo(userInfo);
    await this.props.onAfterAuthorized();
  }

  render () {
    return (
      <View className='auth-button'>
        <Button className='btn' openType='getUserInfo' onGetUserInfo={this.getUserInfo} />
      </View>
    )
  }
}

AuthButton.defaultProps = {
  onAfterAuthorized(e) {
    return e;
  }
}

export default AuthButton
