import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from './store'
// import '@/utils/tdweapp.js'
import './app.scss'

const store = configStore()

class App extends Component {

  componentDidMount () {}

  onLaunch() {
    // Taro.getUpdateManager().onCheckForUpdate(res => {
    //   if (res.hasUpdate) {
    //     //新版本下载完成
    //     Taro.getUpdateManager().onUpdateReady(() => {
    //       Taro.showModal({
    //         title: '小程序更新提示',
    //         content: '新版本已经准备好，单击确定重启应用',
    //         showCancel: false,
    //       }).then(modalConfirm => {
    //         if (modalConfirm.confirm) {
    //           if (res.confirm) {
    //             // 新的版本已经下载完成，请重启
    //             Taro.getUpdateManager().applyUpdate();
    //           }
    //         }
    //       });
    //     });
    //
    //     //新版本下载失败
    //     Taro.getUpdateManager().onUpdateFailed(function () {
    //       Taro.showModal({
    //         title: '提示',
    //         content: '检查到有新版本，但下载失败，请检查网络设置',
    //         showCancel: false,
    //       });
    //     });
    //   }
    // });
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
