require("dotenv").config();
const xrpl = require("xrpl");

const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_SECRET);
const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_SECRET);

async function tranction() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  console.log("Connected Successfully");

  // const make_tranc = await client.request({
  //   command: "submit",
  //   tx_json: {
  //     TransactionType: "Payment",
  //     Account: cold_wallet.address,
  //     Destination: hot_wallet.address,
  //     Amount: {
  //       currency: "USD",
  //       value: "1",
  //       issuer: cold_wallet.address,
  //     },
  //   },
  //   // secret: "ssDY2dEThmn1hW54ffDTFk1Pxxxb2",
  //   offline: false,
  //   fee_mult_max: 1000,
  // });

  const issue_quantity = "1000";
  const currency_code = "USD";
  const send_token_tx = {
    TransactionType: "Payment",
    Account: cold_wallet.address,
    Amount: {
      currency: currency_code,
      value: issue_quantity,
      issuer: cold_wallet.address,
    },
    Destination: hot_wallet.address,
    DestinationTag: 1, // Needed since we enabled Require Destination Tags
    // on the hot account earlier.
  };
  const pay_prepared = await client.autofill(send_token_tx);
  const pay_signed = cold_wallet.sign(pay_prepared);
  console.log(
    `Sending ${issue_quantity} ${currency_code} to ${hot_wallet.address}...`
  );
  const pay_result = await client.submitAndWait(pay_signed.tx_blob);
  console.log(pay_result);
  // console.log(make_tranc.result);
}

module.exports = { tranction };
