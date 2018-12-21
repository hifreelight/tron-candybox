'use strict'

const TronWeb = require('tronweb')

const fullNode = 'https://api.trongrid.io'
const solidityNode = 'https://api.trongrid.io'
const eventServer = 'https://api.trongrid.io'
const pk = '24a1a7e24a956138b0abf0a47cee816bd7180762f2c7df7167925c8c12e8dc98'
const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    pk
)
const contractAddress = 'THvZvKPLHKLJhEFYKiyqj6j8G8nGgfg7ur'
async function a () {
  let c = await tronWeb.contract().at(contractAddress)
  let b = await c.balanceOf('TXAsg1x5Y6mnyx5Z3vsCRNRchMvKwJMUbs').call()

  console.log(b)
}
a()
// tronWeb.trx.getContract(contractAddress)
//   .then(_contract => {
//     let abi = _contract.abi.entrys
//     const token = tronWeb.contract(abi, contractAddress)
//     token.balanceOf('TXAsg1x5Y6mnyx5Z3vsCRNRchMvKwJMUbs').call()
//       .then(b => {
//         console.log(b)
//       })
//   })
//   .catch(err => {
//     console.error(err)
//   })

