import axios from './axios'
import http from './http'

/**
 * put方式请求，data 放置在body
 * @param {String} url
 * @param {Object} data
 * @param {Object} config
 */
export default function (url, data, config) {
  const options = {
    url: url,
    method: 'put',
    data,
  }
  if (config) {
    Object.assign(options, config)
  }
  return http(options)
}
