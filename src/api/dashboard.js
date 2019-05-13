import Vue from 'vue'
import CommonUtil from '@/util/commonUtil'

export const fetchDashboardCacheId = (param, cb) => {
  return new Promise(async (resolve, reject) => {
    // await CommonUtil.sleep(300)
    // return resolve({id: 'cacheId4', flag: 'success'})

    Vue.http.get('Dashboard/checkDashboardNewData').then(response => {
      // return resolve({id: 'cacheId4', flag: 'success'})
      resolve(response.body.data)
    }, err => {
      reject(response.body.data)
    })
  })
}

export const fetchProfitUpDownRate = (param, cb) =>{
  return new Promise((resolve, reject) => {
    Vue.http.post('Report/adminReport', data).then(response => {
      resolve(response.body.data)
    }, err => {
      reject(response.body.data)
    })
  })
}
