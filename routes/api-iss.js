var express = require("express");
const app = express();
var router = express.Router();
const cors = require("cors");

router.use(cors());
router.use(express.json());

// const https = require("https");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a iss");
});

router.post("/get-data", function (req, res, next) {
  // res.json({ msg: "this is CORS-enabled for all origin!" });
  let { date, time } = req.body;
  // console.log("masuk sini", req.body);

  let timestamp = new Date(date + "T" + time + ":00.000Z");

  // let timestamp2 = Date(timestamp).valueOf();
  const ten_minutes = 600;
  let temptimestamp = "";
  let arrayTimestamp = [];
  let arrayTimestamp1 = [];
  let timestampUNIX = timestamp.getTime() / 1000;

  for (let x = 6; x > 0; x--) {
    temptimestamp = timestampUNIX - ten_minutes * x;
    const arr1 = new Date(temptimestamp * 1000);
    const arr = temptimestamp;
    arrayTimestamp.push(arr);
    arrayTimestamp1.push(arr1);
  }
  for (let x = 0; x <= 6; x++) {
    temptimestamp = timestampUNIX + ten_minutes * x;
    const arr1 = new Date(temptimestamp * 1000);
    const arr = temptimestamp;
    arrayTimestamp.push(arr);
    arrayTimestamp1.push(arr1);
  }

  console.log("arrayTimestamp", arrayTimestamp1);
  let _EXTERNAL_URL =
    "https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=" +
    arrayTimestamp.toString() +
    "units=miles";

  var requestify = require("requestify");

  requestify.get(_EXTERNAL_URL).then(function (response) {
    // Get the response body (JSON parsed or jQuery object for XMLs)
    res.json(response.getBody());
    //   response.getBody();
  });

  //   https
  //     .get(_EXTERNAL_URL, (result) => {
  //       // console.log("statusCode:", res.statusCode);
  //       // console.log("headers:", res.headers);
  //       console.log("result", result.data);
  //       result.on("data", (d) => {
  //         // console.log("d", d);
  //         // res.json(process.stdout.write(d));
  //       });
  //     })
  //     .on("error", (e) => {
  //       console.error(e);
  //     });
  //   res.send("post with a iss" + date);
});

module.exports = router;
