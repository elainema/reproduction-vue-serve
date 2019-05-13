import StringUtil from '@/util/stringUtil'
import { expect } from 'chai';

describe('@/util/stringUtil', () => {
  it('replaceTmp', ()  => {
    expect(StringUtil.replaceTmp(
      '{{company}} is great, I am {{name}}', 
      { company:'yeahmobi', name:'Lyon' }
    )).to.be.equal('yeahmobi is great, I am Lyon');
  })

  it('replaceTmp', ()  => {
    expect(StringUtil.replaceTmp(
      '{{company}} is great, I am {{name}} {{name}}', 
      { company:'yeahmobi', name:'Lyon' }
    )).to.be.equal('yeahmobi is great, I am Lyon Lyon');
  })

  it('replaceTmp', ()  => {
    expect(StringUtil.replaceTmp(
      'is great, I am', 
      {}
    )).to.be.equal('is great, I am');
  })

  it('replaceTmp', ()  => {
    expect(StringUtil.replaceTmp(
      '', 
      {}
    )).to.be.equal('');
  })

  it('replaceTmp', ()  => {
    expect(StringUtil.replaceTmp(
      '{{company}} is great, I am {{name}}', 
      {}
    )).to.be.equal(' is great, I am ');
  })
})