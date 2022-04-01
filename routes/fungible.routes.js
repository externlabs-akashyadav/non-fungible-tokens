const express = require("express");
const app = express();
const router = express.Router();

const connectionController = require("../connection/fungible.connection");
const configureIssureController = require("../controllers/configureissuer.cold.settings.controller");
const configureHotController = require("../controllers/configureissuer.host.settings.controller");
const trustlineController = require("../controllers/trustline.hotTocold.controller");
const senttokenColdHotController = require("../controllers/sendtoken.coldtohot.controller");
const confirmTokenBalenceController = require("../controllers/confirm.token.balence.controller");

// router.post("/", connectionController.main);

router.post("/cold-setting/", configureIssureController.cold_settings);
router.post("/hot-setting/", configureHotController.hot_settings);
router.post("/trust-line-hot-cold/", trustlineController.trustline_hotToCold);
router.post(
  "/send-token-cold-hot/",
  senttokenColdHotController.senttokenColdtoHot
);

router.post(
  "/confirm-token-balence/",
  confirmTokenBalenceController.confirmtokenbalence
);

module.exports = router;
