const express = require("express");
const axios = require("axios");
const router = express.Router();

const VOTTUN_API_KEY = process.env.VOTTUN_API_KEY;
const VOTTUN_APPLICATION_ID = process.env.VOTTUN_APPLICATION_ID;

router.get("/testnet", async (_req, res) => {
  try {
    const response = await axios.get(
      "https://api.vottun.tech/core/v1/evm/info/chains",
      {
        headers: {
          Authorization: `Bearer ${VOTTUN_API_KEY}`,
          "x-application-vkn": VOTTUN_APPLICATION_ID,
        },
      }
    );

    const { testnetNetworks } = response.data;
    res.json(testnetNetworks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Vottun API" });
  }
});

router.get("/getMessage", async (_req, res) => {
  try {
    const data = JSON.stringify({
      contractAddress: "0x3883FB853Ab8408D1F303e2d4C01d83793797DF8",
      contractSpecsId: 12064,
      blockchainNetwork: 31,
      method: "getMessage",
      params: [],
    });
    const config = {
      method: "get",
      url: "https://api.vottun.tech/core/v1/evm/transact/view",
      headers: {
        Authorization: `Bearer ${VOTTUN_API_KEY}`,
        "x-application-vkn": VOTTUN_APPLICATION_ID,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);

    const d = response.data;
    res.json(d);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/deploy", async (req, res) => {
  try {
    const blockchainNetwork = req.body.blockchainNetwork;
    const body = JSON.stringify({
      contractSpecsId: 12064,
      sender: "0xfba9abefde37a45bca4577c266a586c4fd1dfec9",
      blockchainNetwork,
      gasLimit: 4000000,
      alias: "Hello World",
      params: [],
    });

    const config = {
      method: "post",
      url: "https://api.vottun.tech/core/v1/evm/contract/deploy",
      headers: {
        Authorization: `Bearer ${VOTTUN_API_KEY}`,
        "x-application-vkn": VOTTUN_APPLICATION_ID,
        "Content-Type": "application/json",
      },
      data: body,
    };
    const response = await axios(config);

    const d = response.data;
    res.json(d);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
