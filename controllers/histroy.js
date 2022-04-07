require("dotenv").config();
const xrpl = require("xrpl");

// const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET);
// const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);

async function history() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");

  const make_tranc = await client.request({
    id: 5,
    command: "tx_history",
    start: 0,
  });

  console.log(make_tranc.result);
}

module.exports = { history };
