/**
 * Created by lyon.yang on 2019/1/7.
 */

 /**
 *
 * @param time [Date]
 * @param separator [String] 分隔符
 * @param type [String] 格式化的类型
 * @returns {*}
 */
export const formatDate = (time, separator = '-', type = 'yyyy-MM-dd') => {
  if (!time && typeof (time) !== 'number') {
    return ''
  }

  let ary = []
  let date
  if (time instanceof Date) {
  } else {
    time = time && parseInt(time)
  }
  date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  let sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  switch (type) {
    case 'YY-MM':
      ary = [year, month]
      break
    case 'YY-MM-DD':
      ary = [year, month, day]
      break
    case 'hh-mm':
      ary = [hour, min]
      break
    case 'MM-dd':
      ary = [month, day]
      break
    case 'Y-M-d-h-m-0':
      let str5 = [year, month, day].join('-')
      let str6 = [hour, min, '00'].join(':')
      ary = [str5, str6]
      break
    case 'Y-M-d-h-m-s':
      let str1 = [year, month, day].join('-')
      let str2 = [hour, min, sec].join(':')
      ary = [str1, str2]
      break
    case 'y-m-d-h-m-s':
      let str3 = [year, month, day].join('-')
      let str4 = [hour, min, sec].join('-')
      ary = [str3, str4]
      break
    default:
      ary = [year, month, day]
  }
  return ary.join(separator)
}
