
import cbj from '../../build/contracts/CandyBox.json'
let candyBox = null

class CandyBox {
  constructor () {
    candyBox = candyBox || this
    this.tronWeb = window.tronWeb
    this.contract = null
    this.address = cbj.networks['*'].address
    return candyBox
  }
  setContract (tronWeb) {
    this.tronWeb = tronWeb
    this.contract = tronWeb.contract(cbj.abi, cbj.networks['*'].address)
  }
  async getTotal () {
    this.setContract(window.tronWeb)
    const index = await this.contract.candyIdIndex_.call().call()
    return index - 1
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
