import UrlUtil from '@/util/urlUtil'
import { expect } from 'chai';

describe('@/util/urlUtil', () => {
  it('serialize', ()  => {
    expect(UrlUtil.serialize({ company:'yeahmobi', name:'Lyon' }
    )).to.be.equal('company=yeahmobi&name=Lyon');
  })

  it('serialize', ()  => {
    expect(UrlUtil.serialize(
      123
    )).to.be.equal('');
  })

  it('serialize', ()  => {
    expect(UrlUtil.serialize(
      null
    )).to.be.equal('');
  })

  it('serialize', ()  => {
    expect(UrlUtil.serialize(
    )).to.be.equal('');
  })

  it('serialize', ()  => {
    expect(UrlUtil.serialize(
      { array: [1, 2]}
    )).to.be.equal('array[]=1&array[]=2');
  })

  it('serialize', ()  => {
    expect(UrlUtil.serialize(
      [1,2]
    )).to.be.equal('');
  })
})