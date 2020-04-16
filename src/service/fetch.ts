import { storage } from '../storage'

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

export const get = (path: any, data: any) => {
  let token = storage.load('token') || ''

  if (token) {
    headers['authentication'] = token
  }

  if (data) {
    path.append(`?${getParam(data)}`)
  }

  return new Promise((resolve, reject) => {
    fetch(path, {
      headers
    })
    .then(async (response: { text: () => any; }) => {
      const r1 = await response.text();
      const r2 = r1.trim && r1.trim()
      return r2 && JSON.parse(r2)
    })
    .then((result: { data: any; }) => {
      resolve(result && result.data)
    })
    .catch((error: any) => reject(error))
  })
};

export const post = (path: RequestInfo, data: any) => {
  let token = storage.load('token') || ''

  if (token) {
    headers['authentication'] = token
  }

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
    .then((response: { json: () => any; }) => response.json())
    .then((result: { data: unknown; }) => resolve(result.data))
    .catch((error: any) => reject(error))
  })
} 