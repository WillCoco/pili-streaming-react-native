import configStore from '../store'

const { store } = configStore()

// get请求 拼接参数
const getParam = (data: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  return Object.entries(data).map(([key, value]) => {
    return `${key}=${value}`  // TODO 是否得用encodeURI函数
  }).join('&');
};

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'authentication': ''
}

export const get = (path: any, data?: any) => {
  const { userData } = store.getState()

  if (userData.token) {
    headers['authentication'] = userData.token
  }

  if (data) {
    path = `${path}?${getParam(data)}`
  }

  return new Promise((resolve, reject) => {
    fetch(path, {
      headers
    })
    .then(async (response: { text: () => any; }) => {
      const r1 = await response.text()
      const r2 = r1.trim && r1.trim()
      return r2 && JSON.parse(r2)
    })
    .then((result: { data: any; }) => {
      resolve(result && result.data)
    })
    .catch((error: any) => reject(error))
  })
};

export const post = (path: RequestInfo, data: any, onlyData: boolean = true) => {
  const { userData } = store.getState()

  if (userData.token) {
    headers['authentication'] = userData.token
  }

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
    .then(async (response: { text: () => any; }) => {
      const r1 = await response.text()
      const r2 = r1.trim && r1.trim()
      return JSON.parse(r2)
    })
    .then((result: { data: unknown; }) => {
      if (onlyData) {
        resolve(result.data)
      } else (
        resolve(result)
      )
    })
    .catch((error: any) => reject(error))
  })
} 

/**
 * 上传
 */
interface fileType {
  uri: string,
  name: string,
  type: string,
}
export const upload = (path: RequestInfo, files: Array<fileType>) => {
  let formData = new FormData();
  files.forEach((file: fileType) => {
    const f: any = {uri: file.uri, name: file.name, type: file.type}
    formData.append('file', f);
  })
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type':'multipart/form-data',
      },
      body: JSON.stringify(formData)
    })
    .then((response: { json: () => any; }) => response.json())
    .then((result: { data: unknown; }) => resolve(result.data))
    .catch((error: any) => reject(error))
  })
} 