import { expect } from 'chai';
import { getRoleName } from '@/views/dashboard/role-ref'

describe('@/views/dashboard/role-ref', () => {
  it('getRoleName', ()  => {
    expect(getRoleName(3, 2, 3))
    .to.be.equal('am');
  })

  it('getRoleName', ()  => {
    expect(getRoleName(5, 8, 8))
    .to.be.equal('manager');
  })

  it('getRoleName', ()  => {
    expect(getRoleName(0, 0, 0))
    .to.be.equal('others');
  })

  it('getRoleName', ()  => {
    expect(getRoleName())
    .to.be.equal('others');
  })
})