import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Swiper, SwiperItem } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../store/actions'

import './index.scss'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Demo {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Demo extends Component {
  UNSAFE_componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='demo'>
        <Swiper
          className='scroll-box'
          vertical={false}
        >
          <SwiperItem>
            1
          </SwiperItem>
          <SwiperItem>
            2
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}

export default Demo

