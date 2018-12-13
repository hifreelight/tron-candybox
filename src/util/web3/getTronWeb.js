let getTronWeb = new Promise(function (resolve, reject) {
  // Wait for loading completion to avoid race conditions with tronWeb injection timing.
  window.addEventListener('load', function () {
    var tronWeb = window.tronWeb

    // Checking if TronWeb has been injected by the browser (Mist/MetaMask)
    if (typeof tronWeb !== 'undefined') {
      // Use Mist/MetaMask's provider
      resolve({
        hasInjectedTronWeb: true,
        tronWeb
      })
    } else {
      reject({
        result: null,
        err: 'Unable to connect to TronWeb'
      })
    }
  })
})
// .then((networkIdResult) => { // get coinbase
//   return new Promise(function (resolve, reject) {
//     networkIdResult.tronWeb.trx.getAccount()
//       .then(account => {
//         let coinbase = networkIdResult.tronWeb.address.fromHex(account.address)
//         let result
//         result = Object.assign({}, networkIdResult, { coinbase })
//         resolve(result)
//       })
//       .catch(err => {
//         let result = Object.assign({}, networkIdResult)
//         reject({
//           result,
//           err
//         })
//       })
//   })
// })

export default getTronWeb
