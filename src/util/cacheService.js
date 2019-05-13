import Vue from 'vue'
import store from '@/store/modules/app';
import * as _ from 'lodash'
import { DASHBOARD_CACHED_PREFIX, DASHBOARD_CACHED_ID } from './constants'
import UrlUtil from './urlUtil'
import CommonUtil from './commonUtil'

export class CacheService {
  constructor() {
  }

  static fetchData(url, params = {}, method = 'get') {
    return new Promise(async (resolve, reject) => {
      try{
        let originData = await this.getOriginData(url, method, params)
        return resolve(originData)
        // let cache = this.getStorage(`${DASHBOARD_CACHED_PREFIX}${url}?${UrlUtil.serialize(params)}`)
        // let cacheId = this.getStorage(DASHBOARD_CACHED_ID)
        // let originId = store.state.dashboardCacheId

        // // 击中缓存
        // if(cache && this.checkHitCache(cacheId, originId)) {
        //   return resolve(cache)
        // }
        // // 未击中缓存 拉取远端数据
        // let originData = await this.getOriginData(url, method, params)
        // if(originData) {
        //   this.setStorage(`${DASHBOARD_CACHED_PREFIX}${url}?${UrlUtil.serialize(params)}`, originData)
        // }

        // this.setStorage(DASHBOARD_CACHED_ID, originId)

        // return resolve(originData)
      } catch(e) {
        reject(e)
      }
    })
  }

  static checkHitCache(o, n) {
    return o == n
  }

  static getStorage(k) {
    return JSON.parse(localStorage.getItem(k))
  }

  static setStorage(k, v) {
    localStorage.setItem(k, JSON.stringify(v))
  }

  static getOriginData(url, method, realParams) {
    let { item_role_id, role_id } =  store.state.userInfo
    let team_id = realParams.team_id ? realParams.team_id : store.state.userInfo.group_id
    let team_type = store.state.userInfo.group_type

    let params = CommonUtil.deepCopy(realParams)
    Object.assign(params, { item_role_id }, { role_id }, { team_id }, { team_type })
    
    return new Promise((resolve, reject) => {
      Vue.http[method](url, { params })
      .then(response => {
        resolve(response.body.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}