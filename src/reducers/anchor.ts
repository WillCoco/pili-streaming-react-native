import anchorTypes from '../constants/Anchor'

interface InitStateTypes {
  anchorInfo: any, // 主播个人信息
}

const INITIAL_STATE: InitStateTypes = {
  anchorInfo: {},
}

export default function anchorData(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case anchorTypes.SET_ANCHOR_INFO:
      return {...state, anchorInfo: action.payload.anchorInfo};
    default:
      return state;
  }
}