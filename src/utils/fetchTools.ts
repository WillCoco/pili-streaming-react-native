
/**
 * 请求是否成功
 * @param r 
 */
export const isSucceed = (r: any) => r && r.code === 200 && r.success;
