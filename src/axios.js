import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'

// development | production | testing
const URL_MAP = {
  // or /api
  development: 'http://127.0.0.1:8080/api',
  production: 'http://127.0.0.1:8081/api',
  testing: 'http://127.0.0.1:8082/api'
}

// https://github.com/axios/axios#request-config
const instance = axios.create({
  baseURL: URL_MAP[process.env.NODE_ENV] || URL_MAP['development'],
  // or define VUE_APP_API_BASE_URL in the root file .env.*
  timeout: 30000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  responseType: 'json',
  responseEncoding: 'utf8'
})

instance.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

export default instance
