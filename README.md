# candybox

```shell
tronbox migrate --reset --network shasta
mocha test/fxtTokenMcTest.js
mocha test/candyBoxMcTest.js

```

```shell
curl http://39.106.132.95:8090/admin/accounts
```

[ui](https://lanhuapp.com/url/f2QxV)

[candybox contract](https://api.shasta.trongrid.io/wallet/getcontract?value=415DA5969364A3C7E6AC1981B31ACABBDCC7CC32ED)
[fxttoken contract](https://api.shasta.trongrid.io/wallet/getcontract?value=41a25decae9d2e6797f8a8a65fb597ec3c5077be2c)

## error

```shell
Running migration: 1_initial_migration.js
  Replacing Migrations...
  Migrations:
    (base58) THWpH5FPxdRukt7B4wBX1E8qSb4kqq65sK
    (hex) 4152c338ea5184480e71ddb240c27ee7920fa0500b
Saving successful migration to network...
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing CandyBox...
Error encountered, bailing. Network state unknown. Review successful transactions manually.
Error: Contract has not been deployed on the network
    at C:\Users\Administrator\AppData\Roaming\npm\node_modules\tronbox\build\webpack:\packages\tronwrap\index.js:156:1
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:189:7)
```

增加feeLimit解决

## TODO

- 糖果 symbol √ 通过合约地址查询
- 糖果总数量 √
- 黑名单√
- 领取次数恢复√
- 权限 √
- 糖果取出√
- event
- 用户等级 ?
- test
- 糖果信息分开编辑


## test account
{
  address: {base58: "TLCZMHX1TJXB6rFofaMKMrTVs2CQvPcXKf", hex: "417037A6CFDB89B6931253E7D29AD59F951315EE73"}
  privateKey: "76A1707E402088DE4270F8184A42A69BB0016FC179DABD952DBF5686D1780C52"
  publicKey: "0408336FEEFE024DED809472840DD050606DAB27A785C236859737668047F7956EAEDBB284BB0830434184F4E4AF01A0A3A0A42B1E00AE3C39D6408702BE0A3CAD"
}


1.WIN
TRON WIN
基于波场生态的分红型博彩游戏平台
2.DICE
TRONDice
建立在波场生态上的去中心化、高性能的电子游戏平台
3.GOC
GOC DEX
Tron去中心化交易所


TQmiz8KFpqgbWpeyisYRq5qsrp3QTpZvAc
https://zizaiv2.oss-cn-beijing.aliyuncs.com/bettown/teamlogo/nba/WashingtonWizards.png

https://www.bet.town


GitHub
注册邮箱：bd@bimoney.io
密码：bimoney123456
用户名：bimoney
