// import TronWeb from 'tronweb'
// import store from '../../store/'
// const isProd = false
// const fullNode = isProd ? 'https://api.trongrid.io/' : 'https://api.shasta.trongrid.io/'
// const solidityNode = isProd ? 'https://api.trongrid.io' : 'https://api.shasta.trongrid.io'
// const eventServer = isProd ? 'https://api.trongrid.io/' : 'https://api.shasta.trongrid.io/'

const monitorWeb3 = function (state) {
  let tronWeb = window.tronWeb
  let isLocalTronWeb = false
  let eventServerHost = tronWeb ? tronWeb.eventServer.host : ''
  // Checking if browser is Web3-injected (Mist/TronPay)
  if (typeof tronWeb !== 'undefined' && tronWeb) {
    // Use Mist/TronPay's provider
  } else {
    console.log('monitorTronWeb: No tronWeb in browser')
    // tronWeb = new TronWeb(
    //   fullNode,
    //   solidityNode,
    //   eventServer
    // )
    // isLocalTronWeb = true
  }

  setInterval(() => {
    if (tronWeb && !isLocalTronWeb) {
      if (tronWeb.eventServer.host !== eventServerHost) {
        // window.location.reload()
      }
      // web3.version.getNetwork((err, newNetworkId) => {
      //   newNetworkId = !err && newNetworkId ? newNetworkId.toString() : ''
      //   if ((!err && newNetworkId && newNetworkId !== '' && newNetworkId !== networkId) || (!newNetworkId && networkId)) {
      //     store.dispatch(ACTION_TYPES.LOGOUT)
      //     window.location.reload()
      //   } else {
      //     web3.eth.getCoinbase((err, newCoinbase) => {
      //       newCoinbase = !err && newCoinbase ? newCoinbase.toString() : ''
      //       if ((!err && newCoinbase && newCoinbase !== '' && newCoinbase !== coinbase && newNetworkId === APPROVED_NETWORK_ID) || (!newCoinbase && coinbase)) {
      //         store.dispatch(ACTION_TYPES.LOGOUT)
      //         window.location.reload()
      //       } else if (!err && newCoinbase && newCoinbase !== '' && newCoinbase !== coinbase) {
      //         coinbase = newCoinbase
      //         store.dispatch(ACTION_TYPES.UPDATE_WEB3_PROPERTIES, {
      //           properties: ['coinbase'],
      //           values: [ newCoinbase ]
      //         })
      //       }
      //     })
      //   }
      // })
    }
  }, 666)
}

export default monitorWeb3
