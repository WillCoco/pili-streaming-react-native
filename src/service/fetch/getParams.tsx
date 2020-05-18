 // get请求 拼接参数
 export const getParam = (data: { [s: string]: unknown } | ArrayLike<unknown>) => {
  return Object.entries(data)
    .map(([key, value]) => {
      return `${key}=${value}`; // TODO 是否得用encodeURI函数
    })
    .join("&");
};