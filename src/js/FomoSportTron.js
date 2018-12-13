import BMSport from '../../build/contracts/CandyBox.json'
let fomoSport = null

class FomoSportTron {
  constructor () {
    fomoSport = fomoSport || this
    this.tronWeb = window.tronWeb
    this.contract = null
    return fomoSport
  }
  setContract (tronWeb) {
    this.contract = tronWeb.contract(this.getContractToUse()['BMSport'].abi, this.getContractToUse()['BMSport'].address)
  }
  getContractToUse () {
    return {
      BMSport
    }
  }
  getGame (gameId) {
    return this.contract.game_(gameId).call()
  }
  getGameStatus (gameId) {
    return this.contract.gameStatus_(gameId).call()
      .then(data => {
        return data
      })
  }
  createGame (eventId, _teams) {
    _teams = _teams.map((n) => {
      n = n.toString()
      const len = n.length
      if (len < 32) {
        for (let i = 0; i < 32 - len; i++) {
          n = '0' + n
        }
      }
      return this.tronWeb.fromAscii(n)
    })
    return this.contract.createGame(eventId, _teams)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
  }
  activate (gameId, startTime, cb) {
    return this.contract.activate(Number(gameId), startTime)
      .send({
        shouldPollResponse: true, callValue: 0
      })
  }
  setCloseTime (gameId, closeTime, cb) {
    return this.contract.setCloseTime(Number(gameId), closeTime)
      .send({
        shouldPollResponse: true, callValue: 0
      })
  }
  settleGame (gameId, team, comment, deadline, cb) {
    return this.contract.setCloseTime(Number(gameId), team, comment, deadline)
      .send({
        shouldPollResponse: true, callValue: 0
      })
  }
  clearFund (gameId) {
    return this.contract.clearFund(Number(gameId))
      .send({
        shouldPollResponse: true, callValue: 0
      })
  }
}
fomoSport = new FomoSportTron()
export default fomoSport
