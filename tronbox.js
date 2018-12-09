module.exports = {
  networks: {

// trontools/quickstart docker image
    development: {
      privateKey: // don't change this private key
      'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
      fullHost: "http://127.0.0.1:9090",
      feeLimit: 2*1e8,
      userFeePercentage: 30,
      originEnergyLimit: 1e5,
      network_id: "*"
    },

// TronGrid Shasta testnet
    shasta: {

      // Put your shasta account's private key here:
      privateKey: '24a1a7e24a956138b0abf0a47cee816bd7180762f2c7df7167925c8c12e8dc98',

      // To receive trx for your shasta account go to
      // https://www.trongrid.io/shasta
      // and paste your address in the field at the bottom of the page

      consume_user_resource_percent: 30,
      fullHost: "https://api.shasta.trongrid.io",
      feeLimit: 2*1e8,
      userFeePercentage: 30,
      originEnergyLimit: 1e5,
      network_id: "*"
    }
  }
}
