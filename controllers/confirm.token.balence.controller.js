require("dotenv").config();
const xrpl = require("xrpl");

const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);
const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET);
// Check balances ------------------------------------------------------------

async function confirmtokenbalence() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");
  console.log("Getting hot address balances...");

  const hot_balances = await client.request({
    command: "account_lines",
    account: hot_wallet.address,
    ledger_index: "validated",
  });

  console.log(hot_balances.result);

  console.log("Getting cold address balances...");

  const cold_balances = await client.request({
    command: "gateway_balances",
    account: cold_wallet.address,
    ledger_index: "validated",
    hotwallet: [hot_wallet.address],
  });
  console.log(JSON.stringify(cold_balances.result, null, 2));

  client.disconnect();
}

module.exports = { confirmtokenbalence };
