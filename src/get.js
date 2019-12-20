import axios from './axios'
import http from './http'

/**
 * get方式请求，params为url形式的参数 URL parameters
 * @param {String} url
 * @param {Object} params
 * @param {Object} config
 */
export default function (url, params, config) {
  const options = {
    url: url,
    method: 'get',
    params,
  }
  if (config) {
    Object.assign(options, config)
  }
  return http(options)
}
