
// mutations.spec.js
import { expect } from 'chai'
import { mutations } from '../app/store/modules/loginForm'


// 解构 mutations
const { USER_LOGINED } = mutations

describe('USER_LOGINED', () => {
  it('USER_LOGINED', () => {
    // 模拟状态
    const state = { logged_user: false }
    // 应用 mutation
    USER_LOGINED(state)
    // 断言结果
    expect(state.logged_user).to.equal(true)
  })
})


