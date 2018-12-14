
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
    const index = await this.contract.candyIdIndex_.call().call()
    return index - 1
  }
  addCandy (tokenAddr, name, total, once, imageUrl, bgUrl, title, introduction, link, order) {
    return this.contract.addCandy(tokenAddr, name, total, once, imageUrl, bgUrl, title, introduction, link, order)
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
}
candyBox = new CandyBox()
export default candyBox
