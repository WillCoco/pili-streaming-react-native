export const Actions = {
  'PUSH': 'PUSH',
  'UNSHIFT': 'UNSHIFT',
  'REMOVE': 'REMOVE',
  'REMOVE_ALL': 'REMOVE_ALL',
};

export enum MaskContentTypes {
  Normal,
};

export interface MaskContent {
  type: MaskContentTypes,
  data: any,
  contentType: MaskContentTypes,
}

export interface State {
  list: Array<MaskContent>,
}

export function reducer(state: State, action: any) {
  console.log(state, 'maskDispatchmaskDispatchmaskDispatchmaskDispatchmaskDispatch', action)
  switch(action.type) {
    case Actions.PUSH:
      console.log(pushHandler(state, action.payload), 11111111111)
      return pushHandler(state, action.payload);
    case Actions.UNSHIFT:
      return unshiftHandler(state, action.payload);
    case Actions.REMOVE:
      return removeHandler(state, action.payload);
    case Actions.REMOVE_ALL:
      return removeAllHandler(state, action.payload);
    default: 
      throw new Error('请指定Mask动作');
  }
}

function pushHandler(state: State, payload: any) {
  const oldList = state.list;
  const item = payload.item;
  if (oldList.indexOf && oldList.indexOf(item) === -1) {
    return {...state, list: [...oldList, item]};
  }
  return state;
}

function unshiftHandler(state: State, payload: any) {
  const oldList = state.list;
  const item = payload.item;
  return {...state, list: [...new Set([item, ...oldList])]};
}

function removeHandler(state: State, payload: any) {
  const oldList = state.list;
  const {depth = 1} = payload;
  // 清除所有
  if (depth === -1) {
    return {...state, list: []};;
  }

  const newList = oldList.splice(depth);
  return {...state, list: [...newList]};
}

function removeAllHandler(state: State, payload: any) {
  return removeHandler(state, {item: payload.item, depth: -1});
}