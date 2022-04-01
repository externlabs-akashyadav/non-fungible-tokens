require("dotenv").config();
const xrpl = require("xrpl");

// Configure hot address settings --------------------------------------------
const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);
// console.log("wallet DatA hot: ", hot_wallet.address);

const hot_settings_tx = {
  TransactionType: "AccountSet",
  Account: hot_wallet.address,
  Domain: "6578616D706C652E636F6D", // "example.com"
  // enable Require Auth so we can't use trust lines that users
  // make to the hot address, even by accident:
  SetFlag: xrpl.AccountSetAsfFlags.asfRequireAuth,
  Flags:
    xrpl.AccountSetTfFlags.tfDisallowXRP |
    xrpl.AccountSetTfFlags.tfRequireDestTag,
};

async function hot_settings() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");

  const hst_prepared = await client.autofill(hot_settings_tx);
  const hst_signed = hot_wallet.sign(hst_prepared);
  console.log("Sending hot address AccountSet transaction...");
  const hst_result = await client.submitAndWait(hst_signed.tx_blob);
  if (hst_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(
      `Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.hash}`
    );
  } else {
    throw `Error sending transaction: ${hst_result.result.meta.TransactionResult}`;
  }
  client.disconnect();
}

module.exports = { hot_settings };
