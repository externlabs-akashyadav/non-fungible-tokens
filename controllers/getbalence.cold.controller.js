require("dotenv").config();
const xrpl = require("xrpl");

// const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);
const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET);
// Check balances ------------------------------------------------------------

async function getBalCold() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");
  console.log("Getting cold address balances...");

  const cold_balances = await client.request(
    // command: "gateway_balances",
    // account: cold_wallet.address,
    // ledger_index: "validated",

    {
      id: "example_gateway_balances_1",
      command: "gateway_balances",
      account: cold_wallet.address,
      strict: true,
      hotwallet: [
        "rso7bHjRV2kQYubfVeksukYArC32BJ6qA1",
        "r9SKcjuxqCv6kDefEJ8Qjnsj1FJWrs5ntV",
      ],
      ledger_index: "validated",
    }
  );

  console.log(cold_balances.result);
}

module.exports = { getBalCold };
