import {
  ADD,
  MINUS,
  RESET_GOODS_AND_PRICE,
  SET_USER_INFO,
  ADD_GOODS,
  CALC_TOTAL_PRICE
} from './constants'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}

export const onResetGoodsAndPrice = () => {
  return {
    type: RESET_GOODS_AND_PRICE
  }
}

export const onSetUserInfo = (payload) => {
  return {
    type: SET_USER_INFO,
    payload
  }
}

export const onAddGoods = (payload) => {
  return {
    type: ADD_GOODS,
    payload
  }
}

export const onCalcTotalPrice = (payload) => {
  return {
    type: CALC_TOTAL_PRICE,
    payload
  }
}