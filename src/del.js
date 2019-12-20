import axios from './axios'
import http from './http'

/**
 * del方式请求,参数包含在url中 如何 delete: /user/1
 * @param {String} url
 * @param {Object} config
 */
export default function (url, config) {
  const options = {
    url: url,
    method: 'delete'
  }
  if (config) {
    Object.assign(options, config)
  }
  return http(options)
}
