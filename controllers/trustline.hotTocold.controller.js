require("dotenv").config();
const xrpl = require("xrpl");

const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);
// console.log("wallet DatA cold: ", hot_wallet.address);

const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET);
// console.log("wallet DatA cold: ", cold_wallet.address);

// Create trust line from hot to cold address --------------------------------
const currency_code = "FOO";
const trust_set_tx = {
  TransactionType: "TrustSet",
  Account: hot_wallet.address,
  LimitAmount: {
    currency: currency_code,
    issuer: cold_wallet.address,
    value: "10000000000", // Large limit, arbitrarily chosen
  },
};

async function trustline_hotToCold() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");

  const ts_prepared = await client.autofill(trust_set_tx);
  const ts_signed = hot_wallet.sign(ts_prepared);
  console.log("Creating trust line from hot address to issuer...");
  const ts_result = await client.submitAndWait(ts_signed.tx_blob);
  if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(
      `Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed.hash}`
    );
  } else {
    throw `Error sending transaction: ${ts_result.result.meta.TransactionResult}`;
  }
  client.disconnect();
}

module.exports = { trustline_hotToCold };
