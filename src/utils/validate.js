/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 校验手机号
 * @param {string} str
 * @returns {Boolean}
 */
export function validMobile(str) {
  return /^1[3-9]\d{9}$/.test(str) // 校验手机号
}
