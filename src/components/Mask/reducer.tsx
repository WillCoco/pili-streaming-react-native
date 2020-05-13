// type ActionTypes = 'PUSH' | 'UNSHIFT' | 'REMOVE' | 'REMOVE_ALL';

export enum Actions {
  PUSH = 'PUSH',
  UNSHIFT = 'UNSHIFT',
  REMOVE = 'REMOVE',
  REMOVE_ALL = 'REMOVE_ALL',
};

export enum MaskContentTypes {
  Normal = 'Normal',
  WithAvatar = 'WithAvatar',
  WithBorderTop = 'WithBorderTop',
  Prompt = 'Prompt',
  IOSDatePicker = 'IOSDatePicker',
};

export interface MaskContent {
  type: MaskContentTypes,
  data?: any,
}

export interface State {
  list: Array<MaskContent>,
}

interface PayloadType {
  type: MaskContentTypes, // 弹窗类型
  data: any, // 自定义数据
  [key: string]: any
}

interface RemovePayloadType {
  depth: number
}

interface ActionType {
  type: Actions,
  payload: PayloadType | RemovePayloadType
}

export function reducer(state: State, action: ActionType) {
  // console.log(state, 'maskDispatchmaskDispatchmaskDispatchmaskDispatchmaskDispatch', action)
  switch(action.type) {
    case Actions.PUSH:
      // console.log(pushHandler(state, action), './//////', action)
      return pushHandler(state, action.payload as PayloadType);
    case Actions.UNSHIFT:
      return unshiftHandler(state, action.payload as PayloadType);
    case Actions.REMOVE:
      return removeHandler(state, action.payload as RemovePayloadType);
    case Actions.REMOVE_ALL:
      return removeAllHandler(state);
    default: 
      throw new Error('请指定Mask动作');
  }
}

function pushHandler(state: State, payload: PayloadType) {
  const oldList = state.list;
  const {type, data} = payload;
  // if (oldList.indexOf && oldList.indexOf(type) === -1) {
    return {...state, list: [...oldList, {type, data}]};
  // }
  // return state;
}

function unshiftHandler(state: State, payload: PayloadType) {
  const oldList = state.list;
  const {type, data} = payload;

  return {...state, list: [...new Set([{type, data}, ...oldList])]};
}

function removeHandler(state: State, payload: RemovePayloadType) {
  const oldList = state.list;
  const {depth = 1} = payload || {};
  // 清除所有
  if (depth === -1) {
    return {...state, list: []};;
  }

  const newList = oldList.splice(depth);
  return {...state, list: [...newList]};
}

function removeAllHandler(state: State) {
  return removeHandler(state, {depth: -1});
}