require("dotenv").config();
const xrpl = require("xrpl");

const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET);
const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);

async function tranction() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");

  const make_tranc = await client.request({
    command: "submit",
    tx_json: {
      TransactionType: "Payment",
      Account: cold_wallet.address,
      Destination: hot_wallet.address,
      Amount: {
        currency: "USD",
        value: "17",
        issuer: cold_wallet.address,
      },
    },
    secret: "alskdhlaskhlasjdhlajshdlashdlasdh",
    offline: false,
    fee_mult_max: 1000,
  });

  console.log(make_tranc.result);
}

module.exports = { tranction };
