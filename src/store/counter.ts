import moment from 'dayjs'
import {
  ADD,
  MINUS,
  RESET_GOODS_AND_PRICE,
  SET_USER_INFO,
  ADD_GOODS,
  CALC_TOTAL_PRICE,
  CHANGE_TRAIN
} from './constants'

const INITIAL_STATE = {
  num: 0,
  isShowAuthButton: false,
  train: 'G111',
  date: moment().format('YYYY-MM-DD'),
  startStation: {
    aTime: '15:00',
    station: '长沙南'
  },
  endStation: {
    aTime: '18:00',
    station: '广州南'
  },
  trainMsg: {},
  carriage: null,
  carriageNum: 0,
  isLink: false,
  selectedGoodsList: [],
  userInfo: '',
  totalPrice: 0,
  totalProNum: 0
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
     return {
       ...state,
       num: state.num - 1
     }
    case RESET_GOODS_AND_PRICE:
      return {
        ...state,
        selectedGoodsList: [],
        totalPrice: 0
      }
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case ADD_GOODS:
      return {
        ...state,
        selectedGoodsList: [...action.payload]
      }
    case CALC_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload
      }
    case CHANGE_TRAIN:
      return {
        ...state,
        trainMsg: action.payload
      }
     default:
       return state
  }
}
