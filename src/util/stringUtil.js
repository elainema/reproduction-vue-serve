export default class StringUtil{
  constructor() {
  }

  static REGEX_REPLACE_TMP = /\{\{(\w+)\}\}/g

  /**
   * @param {String} str like '{{company}} is great, I am {{name}}'
   * @param {Object} data like { company:'yeahmobi', name:'Lyon' }
   * @returns like yeahmobi is great, I am Lyon
   */
  static replaceTmp(str, data) {
    return str.replace(this.REGEX_REPLACE_TMP, (match, key) =>{
      return data[key] || ''
    })
  }
}