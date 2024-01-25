const express = require("express");
const axios = require("axios");
const router = express.Router();

const DEXTOOL_API_KEY = process.env.DEXTOOL_API_KEY;

router.get("/chains", async (req, res) => {
  const sort = req.query.order ?? "name";
  const order = req.query.sort ?? "asc";

  let page, pageSize;

  if (req.query.page) {
    page = parseInt(req.query.page, 10);
  }

  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize, 10);
  }

  try {
    const response = await axios.get(
      "https://open-api.dextools.io/free/v2/blockchain",
      {
        params: {
          order,
          page,
          pageSize,
          sort,
        },
        headers: {
          "X-BLOBR-KEY": DEXTOOL_API_KEY,
        },
      }
    );

    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching data from Dextools API",
    });
  }
});

module.exports = router;
