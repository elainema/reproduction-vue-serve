import * as _ from 'lodash'

export default class UrlUtil{
  constructor() {
  }

  /**
   * @param {Object} obj like { company:'yeahmobi', name:'Lyon' }
   * @returns like 'company=yeahmobi&name=Lyon&'
   */
  static serialize(obj) {
    let s = ''

    if(!_.isPlainObject(obj)) {
      console.warn('only can serialize an Object')
      return s
    }

    for(let k in obj) {
      let v = obj[k]

      if(_.isArray(v)) {
        v.map(a => {
          s += `${k}[]=${a}&`
        })
      } else {
        s += `${k}=${obj[k]}&`
      }
    }

    return s.substring(0, s.length-1)
  }
}