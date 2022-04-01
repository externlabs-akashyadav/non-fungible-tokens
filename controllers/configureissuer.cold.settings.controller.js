require("dotenv").config();
const xrpl = require("xrpl");

// Configure issuer (cold address) settings ----------------------------------
const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET);
// console.log("wallet DatA cold: ", cold_wallet.address);

const cold_settings_tx = {
  TransactionType: "AccountSet",
  Account: cold_wallet.address,
  TransferRate: 0,
  TickSize: 5,
  Domain: "6578616D706C652E636F6D", // "example.com"
  SetFlag: xrpl.AccountSetAsfFlags.asfDefaultRipple,
  // Using tf flags, we can enable more flags in one transaction
  Flags:
    xrpl.AccountSetTfFlags.tfDisallowXRP |
    xrpl.AccountSetTfFlags.tfRequireDestTag,
};

async function cold_settings() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");

  const cst_prepared = await client.autofill(cold_settings_tx);
  const cst_signed = cold_wallet.sign(cst_prepared);
  console.log("Sending cold address AccountSet transaction...");
  const cst_result = await client.submitAndWait(cst_signed.tx_blob);
  if (cst_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(
      `Transaction succeeded: https://testnet.xrpl.org/transactions/${cst_signed.hash}`
    );
  } else {
    throw `Error sending transaction: ${cst_result}`;
  }
  client.disconnect();
}

module.exports = { cold_settings };
