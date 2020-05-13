import configStore from "../store";
import Toast from "react-native-tiny-toast";
import { toggleLoginState, setToke, setUserInfo } from "../actions/user";

const { store } = configStore();

const initUserInfo = {
  accountMoney: 0,
  anchorCount: 0,
  bgc: "",
  card: 0,
  collectionCount: 0,
  consumeMoney: 0,
  fansCount: 0,
  frozenMoney: 0,
  hasSettle: 0,
  inviteCode: "",
  likeContent: 0,
  lookCount: 0,
  needMoney: 0,
  nextLevel: "",
  nickName: "",
  publishCount: 0,
  quanPinMoney: 0,
  saveMoney: 0,
  storeFollow: 0,
  totalProfit: 0,
  userAvatar: "",
  userId: "",
  userLevel: [],
  willSettle: 0,
};

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

  console.log('%cPath:', 'color: red; font-size: 20px; ', path)
  console.log('%cParams:', 'color: red; font-size: 20px; ', data)

  if (data) {
    path = `${path}?${getParam(data)}`;
  }
  
  
  return new Promise((resolve, reject) => {
    fetch(path, {
      headers,
    })
      .then(async (response: { text: () => any; status: number }) => {
        if (response.status !== 200) {
          Toast.show("网络错误", { position: 0 });
          return;
        }
        const r1 = await response.text();
        const r2 = r1.trim && r1.trim();
        return r2 && JSON.parse(r2);
      })
      .then((result: { data: any; code: number; message: string }) => {
        if (result.code === 200) {
          onlyData ? resolve(result.data) : resolve(result);
        } else if (result.code === 203 || result.code === 204) {
          Toast.show("用户信息过期，请重新登录", { position: 0 });
          store.dispatch(toggleLoginState(false));
          store.dispatch(setToke(""));
          store.dispatch(setUserInfo(initUserInfo));
        } else {
          Toast.show(result.message);
        }
      })
      .catch((error: any) => reject(error));
  });
};

export const post = (
  path: RequestInfo,
  data: any,
  onlyData: boolean = true
) => {
  const { userData } = store.getState();

  if (userData.token) {
    headers["authentication"] = userData.token;
  }

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })
      .then(async (response: { text: () => any; status: number }) => {
        if (response.status !== 200) {
          Toast.show("网络错误", { position: 0 });
          return;
        }
        const r1 = await response.text();
        const r2 = r1.trim && r1.trim();
        return r2 && JSON.parse(r2);
      })
      .then((result: { data: any; code: number; message: string }) => {
        if (result.code === 200) {
          onlyData ? resolve(result.data) : resolve(result);
        } else if (result.code === 203 || result.code === 204) {
          Toast.show("用户信息过期，请重新登录", { position: 0 });
          store.dispatch(toggleLoginState(false));
          store.dispatch(setToke(""));
          store.dispatch(setUserInfo(initUserInfo));
        } else {
          Toast.show(result.message);
        }
      })
      .catch((error: any) => reject(error));
  });
};

/**
 * 上传
 */
export interface File {
  type: string;
  uri: string;
}
export const upload = (path: RequestInfo, files: Array<File>) => {
  let formData = new FormData();
  const { userData } = store.getState();

  files.forEach((item: File) => {
    const file: any = { uri: item.uri, fileType: item.type };
    formData.append("file", file);
  });

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        authentication: userData.token,
      },
      body: JSON.stringify(formData),
    })
      .then((response: { json: () => any }) => response.json())
      .then((result: { data: unknown }) => {
        console.log(result, "23123131");
        resolve(result.data);
      })
      .catch((error: any) => reject(error));
  });
};
