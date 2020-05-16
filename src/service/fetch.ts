import configStore from "../store";
import Toast from "react-native-tiny-toast";
import { toggleLoginState, setToke, setUserInfo } from "../actions/user";
const { store } = configStore();
import { sleep } from '../utils/tools';

const timeout = async (ms: number, path: string | RequestInfo): Promise<any> => {
  await sleep(ms);
  return {timeout: path};
}

const TIMEOUT = 20 * 1000; // 普通接口超时时间
const UPLOAD_TIMEOUT = 2 * 60 * 1000; // 上传超时时间

// toRemove
// store.dispatch(setToke("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5NTk3MTA4NyIsImV4cCI6MTYyMDg5OTI5NCwidXVpZCI6IjlkMjAyN2EzYzY3ZDRjMGE5ZTk0NjgyZjI4MWU5YTg0IiwiaWF0IjoxNTg5MzYzMjk0fQ.N2bAajPgPfCuJRyNs0n2LabiSfAWZLD2epbhk-VFscM"));

// get请求 拼接参数
const getParam = (data: { [s: string]: unknown } | ArrayLike<unknown>) => {
  return Object.entries(data)
    .map(([key, value]) => {
      return `${key}=${value}`; // TODO 是否得用encodeURI函数
    })
    .join("&");
};

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  platform: "app",
  authentication: ""
};

export const get = (path: any, data?: any, onlyData: boolean = true) => {
  const { userData } = store.getState();

  console.log('%cToken:', 'color: red; font-size: 20px; ', userData.token)

  if (userData.token) {
    headers["authentication"] = userData.token;
  }

  if (data) {
    path = `${path}?${getParam(data)}`;
  }
  
  console.log('%cPath:', 'color: red; font-size: 20px; ', path)
  console.log('%cParams:', 'color: red; font-size: 20px; ', data)
  
  const fn = fetch(path, {headers})

  const raceTimeout = Promise.race([fn, timeout(TIMEOUT, path)]);

  return raceTimeout.then(async (response: any) => {
    if (response.timeout) {
      Toast.show('连接超时')
      return;
    }

    if (response.status !== 200) {
      Toast.show("网络错误", { position: 0 });
      return;
    }
    const r1 = await response.text();
    const r2 = r1.trim && r1.trim();
    return r2 && JSON.parse(r2);
  })
  .then((result: { data: any; code: number; message: string }) => {
    console.log('result,', result)
    if (result?.code === 200) {
      return onlyData ? Promise.resolve(result.data) : Promise.resolve(result);
    } else if (result?.code === 203 || result?.code === 204) {
      Toast.show("用户信息过期，请重新登录", { position: 0 });
      store.dispatch(toggleLoginState(false));
      store.dispatch(setToke(""));
      store.dispatch(setUserInfo({}));
      // 这两个条件分支也需要修改Promise为完成状态 @hicks
      Promise.resolve(result);
    } else {
      Toast.show(result.message);
      // 这两个条件分支也需要修改Promise为完成状态 @hicks
      Promise.resolve(result);
    }

    console.log(result, 'resultresultresultresultresult')
  })
  .catch((error: any) => Promise.reject(error));
  };

export const post = (
  path: RequestInfo,
  data?: any,
  onlyData: boolean = true
) => {
  const { userData } = store.getState();

  if (userData.token) {
    headers["authentication"] = userData.token;
  }

  console.log('%cPath:', 'color: red; font-size: 20px; ', path)
  console.log('%cParams:', 'color: red; font-size: 20px; ', data)

  const fn = fetch(path, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  const raceTimeout = Promise.race([fn, timeout(TIMEOUT, path)]);

  return raceTimeout
      .then(async (response: { text: () => any; status: number } | any) => {
        if (response.timeout) {
          console.warn(`连接超时: ${response.timeout}`)
          Toast.show('连接超时')
          return;
        }

        if (response.status !== 200) {
          Toast.show("网络错误", { position: 0 });
          return;
        }
        const r1 = await response.text();
        const r2 = r1.trim && r1.trim();
        return r2 && JSON.parse(r2);
      })
      .then((result: { data: any; code: number; message: string }) => {
        console.log('%cresult:', 'color: red; font-size: 20px; ', result)

        if (result?.code === 200) {
          return onlyData ? Promise.resolve(result.data) : Promise.resolve(result);
        } else if (result?.code === 203 || result?.code === 204) {
          Toast.show("用户信息过期，请重新登录", { position: 0 });
          store.dispatch(toggleLoginState(false));
          store.dispatch(setToke(""));
          store.dispatch(setUserInfo({}));
          // 这两个条件分支也需要修改Promise为完成状态 @hicks
          Promise.resolve(result);
        } else {
          // 这两个条件分支也需要修改Promise为完成状态 @hicks
          Toast.show(result.message);
          Promise.resolve(result);
        }
      })
      // 这里reject的,外部调用没有catch的,肯定报错(未捕获的错误)  @hicks
      .catch((error: any) => {
        return Promise.reject(error)
      });
};

/**
 * 直播上传接口
 */
interface fileType {
  uri: string,
  name: string,
  type: string,
}
export interface UpdateParams {
  size: string,
  fileType: string,
  unit: string,
  file: fileType
}

export const liveUpload = (path: RequestInfo, params: UpdateParams): any => {
  let formData = new FormData();

  formData.append("fileType", params.fileType);
  formData.append("unit", params.unit);
  formData.append("size", params.size);
  formData.append("file", params.file as any);

  const headers = {
    // 'Content-Type': 'multipart/form-data',
    'authentication': '',
    'platform': 'app',
  }

  const { userData } = store.getState()

  if (userData.token) {
    headers['authentication'] = userData.token
  }

  const fn = fetch(path, {
    method: 'POST',
    headers,
    body: formData
  })

  const raceTimeout = Promise.race([fn, timeout(UPLOAD_TIMEOUT, path)]);
  
  return raceTimeout
    .then((response: { json: () => any; }) => response.json())
    .then((result: { data: any; }) => Promise.resolve(result))
    .catch((error: any) => console.error(error))
}
