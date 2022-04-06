const xrpl = require("xrpl");

async function main() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  console.log("Connected Successfully");

  client.disconnect();
}

module.exports = { main };
