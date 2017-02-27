const expect = require('chai').expect;
const should = require('chai').should;
const jsdom = require('mocha-jsdom')

describe('Unit Tests', () => {
  jsdom()

  before(() => {
    $ = require('jquery')
    axios = require('axios')
  })

  it('should return sorted array by with oldest date first', () => {
    const grudgesState = [{
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
    const sortByOldDate = require('../public/js/home.js').sortByOldDate

    expect(sortByOldDate(grudgesState)[0].date).to.equal('2/15/17')
    expect(sortByOldDate(grudgesState)[0].id).to.equal(2)
    expect(sortByOldDate(grudgesState)[1].id).to.equal(1)
  })

  it('should return sorted array by with oldest date first', () => {
    const grudgesState = [{
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
    },
    {
      id: 3,
      name: 'abe',
      offence: 'likes vegetables',
      date: '1/10/17',
      forgiven: false
    }]
    const sortByOldDate = require('../public/js/home.js').sortByOldDate

    expect(sortByOldDate(grudgesState)[0].name).to.equal('abe')
    expect(sortByOldDate(grudgesState)[0].id).to.equal(3)
  })

  it('should return sorted array with newest date first', () => {
    const grudges = [{
      id: 1,
      name: 'Lebron',
      offence: 'on the cavs',
      date: '2/22/17',
      forgiven: false
    },
    {
      id: 3,
      name: 'abe',
      offence: 'likes vegetables',
      date: '1/10/17',
      forgiven: false
    },
    {
      id: 2,
      name: 'KD',
      offence: 'left OKC',
      date: '2/15/17',
      forgiven: false
    }]

    const sortByNewDate = require('../public/js/home.js').sortByNewDate

    expect(sortByNewDate(grudges)[2].id).to.equal(3)
    expect(sortByNewDate(grudges)[2].name).to.equal('abe')
  })

  xit('should return sorted array with newest date first', () => {
    const sortByNewDate = require('../public/js/home.js').sortByNewDate
    const grudges = [
    {
      id: 3,
      name: 'abe',
      offence: 'likes vegetables',
      date: '1/10/17',
      forgiven: false
    },
    {
      id: 2,
      name: 'KD',
      offence: 'left OKC',
      date: '2/15/17',
      forgiven: false
    },
    {
      id: 1,
      name: 'Lebron',
      offence: 'on the cavs',
      date: '2/22/17',
      forgiven: false
    }]

    expect(sortByNewDate(grudges)).to.equal([
    {
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
    },
    {
      id: 3,
      name: 'abe',
      offence: 'likes vegetables',
      date: '1/10/17',
      forgiven: false
    }])
  })

  xit('should sort grudges by first name', () => {
    const sortByName = require('../public/js/home.js').sortByName
    const grudges = [
      {
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
      },
      {
        id: 3,
        name: 'abe',
        offence: 'likes vegetables',
        date: '1/10/17',
        forgiven: false
      }]

    expect(sortByName(grudges)).to.equal([
      {
        id: 3,
        name: 'abe',
        offence: 'likes vegetables',
        date: '1/10/17',
        forgiven: false
      },
      {
        id: 2,
        name: 'KD',
        offence: 'left OKC',
        date: '2/15/17',
        forgiven: false
      },
      {
        id: 1,
        name: 'Lebron',
        offence: 'on the cavs',
        date: '2/22/17',
        forgiven: false
      }])
  })

  it('should update state with new state', () => {
    const updateGrudgesState = require('../public/js/home.js').updateGrudgesState
    const state = ['old state', 'with items']
    const newState = ['the new state', 'exciting tests']
    expect(updateGrudgesState(state, newState)).to.equal(newState)
  })

  it('should update state with new state', () => {
    const updateGrudgesState = require('../public/js/home.js').updateGrudgesState
    const state = 33
    const newState = 10
    expect(updateGrudgesState(state, newState)).to.equal(newState)
  })

  it('should update state with new state', () => {
    const updateGrudgesState = require('../public/js/home.js').updateGrudgesState
    const state = {one: [1, 3, 4], two: function hello() {return 'hello'}}
    const newState = {one: [2, 5, 10], two: 'a string'}
    expect(updateGrudgesState(state, newState)).to.equal(newState)
  })

  it('should return length of list', () => {
    const getListCount = require('../public/js/home.js').getListCount
    const list = [{},{},{}]
    expect(getListCount(list)).to.equal(3)
  })

  it('should return length of list', () => {
    const getListCount = require('../public/js/home.js').getListCount
    const list = []
    expect(getListCount(list)).to.equal(0)
  })

  it('should return length of forgiven grudges', () => {
    const getForgivenCount = require('../public/js/home.js').getForgivenCount
    const list = [{forgiven: true}, {forgiven: false}, {forgiven: false}]
    expect(getForgivenCount(list)).to.equal(1)
  })

  it('should return length of forgiven grudges', () => {
    const getForgivenCount = require('../public/js/home.js').getForgivenCount
    const list = [{forgiven: false}, {forgiven: false}, {forgiven: false}]
    expect(getForgivenCount(list)).to.equal(0)
  })

  it('should return length of forgiven grudges', () => {
    const getUnforgivenCount = require('../public/js/home.js').getUnforgivenCount
    const list = [{forgiven: false}, {forgiven: false}, {forgiven: false}]
    expect(getUnforgivenCount(list)).to.equal(3)
  })

  it('should return length of forgiven grudges', () => {
    const getUnforgivenCount = require('../public/js/home.js').getUnforgivenCount
    const list = [{forgiven: true}, {forgiven: true}, {forgiven: false}]
    expect(getUnforgivenCount(list)).to.equal(1)
  })


});
