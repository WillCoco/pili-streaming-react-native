import { storage } from '../storage'

// get请求 拼接参数
const getParam = data => {
  return Object.entries(data).map(([key, value]) => {
    return `${key}=${value}`  // TODO 是否得用encodeURI函数
  }).join('&');
};

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const get = (path, data) => {
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
    .then(async (response) => {
      const r1 = await response.text();
      const r2 = r1.trim && r1.trim()
      return r2 && JSON.parse(r2)
    })
    .then(result => {
      resolve(result && result.data)
    })
    // .then(async (response) => {
    //   return response.json()
    // })
    // .then(result => {
    //   resolve(result && result.data)
    // })
    .catch(error => reject(error))
  })
};

export const post = (path, data) => {
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
    .then(response => response.json())
    .then(result => resolve(result.data))
    .catch(error => reject(error))
  })
} 