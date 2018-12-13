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
