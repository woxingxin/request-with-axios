import axios from './axios'

const STATUS_MSG = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '登录失效，请重新登录。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export const createAction = (type) => payload => ({ type, payload });

export const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const errortext = res.statusText || STATUS_MSG[res.status];
  console.warn(`请求错误 ${res.status}: ${res.url} \n ${errortext}`);
  Promise.reject(res);
};

export const checkCode = res => {
  if (res.resultCode === 0) {
    console.log(res);
    return res;
  }
  const errortext = `${res.resultMsg || res.errorInfo.errorMsg}`;
  console.warn(res);
  const error = new Error(errortext);
  error.name = errortext;
  error.res = res;
  throw error;
};

export const catchError = error => {
  if (!error.response) {
    throw error;
  }
  // 下面代码依赖vuex
  const { dispatch } = store;
  const { status } = e.response;
  if (status === 401) {
    dispatch(createAction('auth/logout')());
  }
}

export default function (option = {
  method: 'get'
}) {
  if (console.group) {
    console.group('%c%s', ' text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:1em', url);
    console.log(option);
    console.groupEnd();
  }
  return axios(option).then(checkStatus).then(checkCode).catch(catchError)
}
