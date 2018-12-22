
import cbj from '../../build/contracts/CandyBox.json'
// import { resolve } from 'dns';
let candyBox = null

class CandyBox {
  constructor () {
    candyBox = candyBox || this
    this.tronWeb = window.tronWeb
    this.contract = null
    this.address = cbj.networks['*'].address
    return candyBox
  }
  async setContract (tronWeb) {
    const self = this
    self.tronWeb = tronWeb
    self.contract = tronWeb.contract(cbj.abi, cbj.networks['*'].address)
    // try {
    //   console.log('account is -----------> %o', await self.tronWeb.trx.getAccount())
    //   return self.contract
    // } catch (err) {
    //   console.error('getAccount err')
    //   // return self.setContract(window.tronWeb)
    //   return await setTimeout(async function () {
    //     await self.setContract(window.tronWeb)
    //   }, 1000)
    // }

    return new Promise(function (resolve, reject) {
      self.tronWeb.trx.getAccount()
        .then(account => {
          self.contract = tronWeb.contract(cbj.abi, cbj.networks['*'].address)
          console.log('this.contract is %o', self.contract)
          resolve(account)
        })
        .catch(err => {
          console.error('getAccount err is %o', err)
          setTimeout(function () {
            self.tronWeb.trx.getAccount()
              .then(account => {
                self.contract = tronWeb.contract(cbj.abi, cbj.networks['*'].address)
                console.log('this.contract is %o', self.contract)
                console.log('account is %o', account)
                resolve(account)
              })
              .catch(err => {
                reject(err)
              })
          }, 100)
        })
    })
  }
  async getTotal () {
    await this.setContract(window.tronWeb)
    try {
      return await this.contract.candyIdIndex_.call().call() - 1
    } catch (err) {
      console.error('getTotal err')
      // return 0
    }
  }
  addCandy (tokenAddr, name, total, once, imageUrl, bgUrl, title, introduction, link, order) {
    this.setContract(window.tronWeb)
    return this.contract.addCandy(tokenAddr, name, total, once, imageUrl, bgUrl, title, introduction, link, order)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
  editCandy (id, tokenAddr, name, total, once, imageUrl, bgUrl, title, introduction, link, order) {
    // this.setContract(window.tronWeb)
    return this.contract.editCandy(id, tokenAddr, name, total, once, imageUrl, bgUrl, title, introduction, link, order)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
  editPubCandy (id, order, isDeleted) {
    this.setContract(window.tronWeb)
    return this.contract.editPubCandy(id, order, isDeleted)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
  async delCandy (id) {
    this.setContract(window.tronWeb)
    await this.contract.delCandy(id)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
  async getCandy (id) {
    let candy = await this.contract.getCandy(id).call()
    let detail = await this.contract.getCandyDetail(id).call()
    return {candy, detail}
  }
  async getBalance (tokenAddress, contractAddress) {
    const tokenContract = await this.tronWeb.trx.getContract(tokenAddress)
    const abi = tokenContract.abi.entrys
    const contract = this.tronWeb.contract(abi, tokenAddress)
    return await contract.balanceOf(contractAddress).call()
  }
  async transferCandy (tokenAddress, accountAddress, amount) {
    return await this.contract.transferCandy(tokenAddress, accountAddress, amount)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
  async setCandyManager (address) {
    return await this.contract.setCandyManager(address)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
  async transferOwnership (address) {
    return await this.contract.transferOwnership(address)
    .send({
      shouldPollResponse: true,
      callValue: 0
    })
  }
  async acceptOwnership () {
    return await this.contract.acceptOwnership()
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
  async addBlacklist (address) {
    return await this.contract.addBlacklist(address)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
  async delBlacklist (address) {
    return await this.contract.delBlacklist(address)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
}
candyBox = new CandyBox()
export default candyBox
