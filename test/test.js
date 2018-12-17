const maxReceiveNumber = 2
const recoveryLimitTime = 60 * 60 * 6

let leftReceiveNumbers = 0
let receiveLastTime = 1545018719
let now = 1545018719 + 60 * 60 * 4
let leftRecoveryTime = 40 * 60

let lrn = (leftReceiveNumbers + parseInt((now - receiveLastTime + (recoveryLimitTime - leftRecoveryTime)) / recoveryLimitTime)) - 1
lrn = lrn < 0 ? 0 : lrn
leftReceiveNumbers = lrn < maxReceiveNumber - 1 ? lrn : maxReceiveNumber - 1

console.log(leftReceiveNumbers)
