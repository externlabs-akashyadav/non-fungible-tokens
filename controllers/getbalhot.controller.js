require("dotenv").config();
const xrpl = require("xrpl");

// const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);
const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);
// Check balances ------------------------------------------------------------

async function getBalHot() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");
  console.log("Getting hot address balances...");

  const hot_balances = await client.request(
    // command: "gateway_balances",
    // account: cold_wallet.address,
    // ledger_index: "validated",

    {
      id: "account_lines_1",
      command: "account_lines",
      account: hot_wallet.address,
      strict: true,
      hotwallet: [
        "rso7bHjRV2kQYubfVeksukYArC32BJ6qA1",
        "r9SKcjuxqCv6kDefEJ8Qjnsj1FJWrs5ntV",
      ],
      ledger_index: "validated",
    }
  );

  // const balence = hot_balances.result;

  // console.log("Balence is: ", balence);
  // let objkey = Object.keys(hot_balances);
  // console.log(objkey["lines"]);
  // console.log(hot_balances["result"]["balance"]);
  // let x = hot_balances.result["lines"][0]["balance"];
  console.log("Balence is:", hot_balances.result["lines"][0]["balance"]);
}

module.exports = { getBalHot };
