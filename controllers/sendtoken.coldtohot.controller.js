require("dotenv").config();
const xrpl = require("xrpl");

const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET);

const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);

// Send token ----------------------------------------------------------------
// const issue_quantity = "3840";
// const currency_code = "USD";
// const send_token_tx = {
//   TransactionType: "Payment",
//   Account: cold_wallet.address,
//   Amount: {
//     currency: currency_code,
//     value: issue_quantity,
//     issuer: cold_wallet.address,
//   },
//   Destination: hot_wallet.address,
//   DestinationTag: 1, // Needed since we enabled Require Destination Tags
//   // on the hot account earlier.
// };

const send_token_tx = {
  TransactionType: "Payment",
  Account: cold_wallet.address,
  Destination: hot_wallet.address,
  Amount: {
    currency: "USD",
    issue_quantity: "1",
    issuer: cold_wallet.address,
  },
  Fee: "12",
  Flags: 2147483648,
  Sequence: 2,
};

async function senttokenColdtoHot() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");

  try {
    const pay_prepared = await client.autofill(send_token_tx);
    const pay_signed = cold_wallet.sign(pay_prepared);
    console.log(
      `Sending ${issue_quantity} ${currency_code} to ${hot_wallet.address}...`
    );
    const pay_result = await client.submitAndWait(pay_signed.tx_blob);
    if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
      console.log(
        `Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash}`
      );
    } else {
      throw `Error sending transaction: ${pay_result.result.meta.TransactionResult}`;
    }
  } catch (err) {
    console.log("ERROR IN SENDING TOKENS: ", err);
  }
  client.disconnect();
}

module.exports = { senttokenColdtoHot };
