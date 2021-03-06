'use strict'

process.env.NODE_ENV = 'shasta'
const network = 'shasta'
// const debug = require('debug')('candybox')
const config = require('../tronbox')
const TronWeb = require('tronweb')
var BigNumber = require('bignumber.js')

const fullNode = config.networks[network].fullHost
const solidityNode = config.networks[network].fullHost
const eventServer = config.networks[network].fullHost
const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    config.networks[network].privateKey
)
const candybox = require('../build/contracts/CandyBox')
const fxttoken = require('../build/contracts/FxtToken')
const contract = tronWeb.contract(candybox.abi, candybox.networks['*'].address)
const fxt = 1000000
let accountOwner = null
describe('A suite for candybox', function () {
  this.timeout(1000 * 60)
  before(async function () {
    accountOwner = await tronWeb.trx.getAccount()
  })
  it('test add candy', async function () {
    await contract.addCandy(
            fxttoken.networks['*'].address,
            'test3',
            new BigNumber(1000).times(fxt).toNumber(),
            new BigNumber(1).times(fxt).toNumber(),
            'https://zizaiv2.oss-cn-beijing.aliyuncs.com/bettown/teamlogo/nba/WashingtonWizards.png',
            'https://zizaiv2.oss-cn-beijing.aliyuncs.com/bettown/teamlogo/nba/WashingtonWizards.png',
            'title3',
            'introduction3',
            'https://www.bet.town/roll',
            10
        )
        .send({
          shouldPollResponse: true,
          callValue: 0
        })
        .then(response => {
          console.log('add candy response is %o', response)
        })
  })
  it('test get candy', async function () {
    let candy = await contract.getCandy(1).call()
    let detail = await contract.getCandyDetail(1).call()
    console.log('candy is %o', candy)
    console.log('detail is %o', detail)
  })

  it('test receive', async function () {
    const result = await contract.receive(1)
    .send({
      shouldPollResponse: true,
      callValue: 0
    })
    console.log('receive result is %o', result)
  })
  it('test my left receive number', async function () {
    console.log('accountOwner.address is %s', accountOwner.address)
    const myNumbers = await contract.myNumbers(accountOwner.address).call()
    // const myNumbers = await contract.myNumbers('TLCZMHX1TJXB6rFofaMKMrTVs2CQvPcXKf').call()
    console.log('myNumbers is %o', myNumbers)
  })
  it('test my lastReceiveTime', async function () {
    const lastReceiveTime = await contract.myLastTime(accountOwner.address).call()
    console.log('lastReceiveTime is %o', lastReceiveTime)
  })
  it('test my receive info', async function () {
    const info = await contract.myLastReceive(accountOwner.address).call()
    console.log('myLastReceive info is %o', info)
  })
  it('test candy index', async function () {
    const index = await contract.candyIdIndex_.call().call()
    console.log('candyIndex is %o', index)
  })
  it('test candy transfer', async function () {
    const index = await contract.transferCandy(fxttoken.networks['*'].address, accountOwner.address, new BigNumber(10).times(fxt).toNumber())
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
    console.log('candyIndex is %o', index)
  })
  it('test in blacklist', async function () {
    const bool = await contract.inBlacklist(accountOwner.address).call()
    console.log('candyIndex is %o', bool)
  })
  it('test canReceive', async function () {
    const bool = await contract.canReceive(accountOwner.address).call()
    console.log('candyIndex is %o', bool)
  })
})
