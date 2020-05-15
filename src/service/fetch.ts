import configStore from "../store";
import Toast from "react-native-tiny-toast";
import { toggleLoginState, setToke, setUserInfo } from "../actions/user";

const { store } = configStore();

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
  authentication: "",
};

export const get = (path: any, data?: any, onlyData: boolean = true) => {
  const { userData } = store.getState();

  console.log("%cToken:", "color: red; font-size: 20px; ", userData.token);

  if (userData.token) {
    headers["authentication"] = userData.token;
  }

  console.log("%cPath:", "color: red; font-size: 20px; ", path);
  console.log("%cParams:", "color: red; font-size: 20px; ", data);

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
          store.dispatch(setUserInfo({}));
          resolve(result.data);
        } else {
          Toast.show(result.message);
          resolve(result.data);
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
        store.dispatch(setUserInfo({}));
        resolve(result.data)
      } else {
        Toast.show(result.message);
        resolve(result.data)
      }
    })
    .catch((error: any) => {
      reject(error)
    });
});
};

/**
 * 直播上传接口
 */
interface fileType {
  uri: string;
  name: string;
  type: string;
}

export const uploadWorkMedia = (
  path: RequestInfo,
  params: UpdateParams
): any => {
  let formData = new FormData();
  console.log(params, "file");
  formData.append("fileType", params.fileType);
  formData.append("file", params.file as any);

  const { userData } = store.getState();

  const headers = {
    authentication: "",
    platform: "app",
  };

  if (userData.token) {
    headers["authentication"] = userData.token;
  }

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      headers,
      body: formData,
    })
      .then((response: { json: () => any }) => response.json())
      .then((result: { data: any }) => resolve(result))
      .catch((error: any) => reject(error));
  });
};
export interface UpdateParams {
  size: string;
  fileType: string;
  unit: string;
  file: fileType;
}

export const liveUpload = (path: RequestInfo, params: UpdateParams): any => {
  let formData = new FormData();
  console.log(params, "file");
  formData.append("fileType", params.fileType);
  formData.append("unit", params.unit);
  formData.append("size", params.size);
  formData.append("file", params.file as any);

  console.log(formData, "formDataformData");

  const headers = {
    // 'Content-Type': 'multipart/form-data',
    authentication: "",
    platform: "app",
  };

  const { userData } = store.getState();

  if (userData.token) {
    headers["authentication"] = userData.token;
  }

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: "POST",
      headers,
      body: formData,
    })
      .then((response: { json: () => any }) => response.json())
      .then((result: { data: any }) => resolve(result))
      .catch((error: any) => console.error(error));
  });
};
