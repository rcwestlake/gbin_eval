const expect = require('chai').expect;
const should = require('chai').should;
const jsdom = require('mocha-jsdom')

describe('Unit Tests', () => {
  jsdom()

  before(() => {
    $ = require('jquery')
    axios = require('axios')
  });

  xit('home.js', () => {
    const add = require('../public/js/home.js')
    const grudges = [{
      id: 1,
      name: 'Lebron',
      offence: 'on the cavs',
      date: '2/22/17',
      forgiven: false
    },
    {
      id: 2,
      name: 'KD',
      offence: 'left OKC',
      date: '2/15/17',
      forgiven: false
    }]
    expect(getGrudgeCounts(grudges)).to.be.a('function')
  })
});
