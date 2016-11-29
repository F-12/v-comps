import Vue from 'vue';
import vPager from '../src/v-pager.vue';
import {expect} from 'chai';

describe('v-pager', () => {
  it('init corrently', () => {
    const vm = new Vue(vPager).$mount();
    expect(vm.current).to.equal(1);
    expect(vm.total).to.equal(1);
    expect(vm.items).to.an('array').include.members([1]);
    expect(vm.placeholder).to.equal('...');
  });

  it('init with props data', () => {
    const Ctor = Vue.extend(vPager);
    const vm = new Ctor({propsData: {total: 3}}).$mount();
    expect(vm.total).to.equal(3);
    expect(vm.items).to.an('array').include.members([1, 2, 3])

    const vm2 = new Ctor({propsData: {total: 12}}).$mount();
    expect(vm2.total).to.equal(12);
    expect(vm2.items).to.an('array').include.members([1, 2, 3, 4, 5, 6, 7, 8, 9, '...', 12]);
    vm2.current = 12;
    expect(vm2.items).to.an('array').include.members([1, '...', 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    vm2.current = 7;
    expect(vm2.items).to.an('array').include.members([1, '...', 3, 4, 5, 6, 7, 8, 9, 10, '...', 12]);
  });

  it('prevClick or nextClick when total is 1', () => {
    const vm = new Vue(vPager).$mount();
    vm.prevClick();
    expect(vm.current).to.equal(1);
    vm.nextClick();
    expect(vm.current).to.equal(1);
  });

  it('illegal current value', () => {
    const vm = new Vue(vPager).$mount();
    vm.current = 0;
    expect(vm.current).to.equal(1);
    //vm.current = 2;
    //expect(vm.current).to.equal(1);
  });
});
